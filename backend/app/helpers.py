import pickle
import random
import torch
import torch.nn.functional as F
import numpy as np
import matplotlib.pyplot as plt

from PIL import Image
from torchvision import transforms
from typing import List, Tuple
from torch import Tensor

FILE_SERVER_ROOT = '../file-server/'
PASSED_IMAGES_PKL = 'pickles/correct_images.pkl'
CLASS_NAMES_PKL = 'pickles/classnames.pkl'
MODEL_PKL = 'pickles/resnet50_pickle.pkl'

def imshow(inp: List, title: str=None):
    plt.figure(figsize=(10, 10))
    tmp = np.hstack([img.numpy() for img in inp]).transpose(1, 2, 0)
    mean = np.array([0.485, 0.456, 0.406])
    std = np.array([0.229, 0.224, 0.225])
    tmp = std * tmp + mean
    tmp = np.clip(tmp, 0, 1)
    plt.imshow(tmp)
    if title is not None:
        plt.title(title)
    plt.show()

def get_random_image() -> str:    
    with open(PASSED_IMAGES_PKL, 'rb') as f:
        correct_images = pickle.load(f)

    random_image = random.choice(correct_images)
    image_path_split = random_image.split('/')
    return '/'.join(image_path_split[-3:])

def get_unattacked_image(image_path: str) -> Tuple:
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Resize(256, antialias=True),
        transforms.CenterCrop(224),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    image_obj = Image.open(FILE_SERVER_ROOT + image_path)
    image = transform(image_obj)
    image = image.unsqueeze(0)
    
    return (image, image_path)

def get_attacked_image(image_path: str) -> Tuple:
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Resize(256, antialias=True),
        transforms.CenterCrop(224),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    noise_ratio = 0.4

    image_obj = Image.open(FILE_SERVER_ROOT + image_path)
    image = transform(image_obj)
    original = image
    noise = torch.randn(image.shape)
    image = noise * noise_ratio + image * (1 - noise_ratio)

    imshow([original, image], 'Original vs Noisey')

    image = image.unsqueeze(0)
    return (image, image_path)

def get_model_prediction(image_data: Tuple) -> List:
    with open(CLASS_NAMES_PKL, 'rb') as f:
        class_names = pickle.load(f)

    image, image_path = image_data

    with open(MODEL_PKL, 'rb') as f:
        model = pickle.load(f)
    model.eval()
    with torch.no_grad():
        output = model(image)

    probabilities = F.softmax(output, dim=1)
    top_values, top_indices = torch.topk(probabilities, 10)
    
    top_predictions = []
    for value, idx in zip(top_values[0], top_indices[0]):
        category = class_names[idx]
        top_predictions.append({
            'imagenet_id': category['imagenet_id'],
            'name': category['name'],
            'probability': float(value),
            'path': image_path
        })

    return top_predictions