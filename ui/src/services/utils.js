const backendHost = "http://127.0.0.1:5000/api";

export const fetchImageApi = `${backendHost}/get-image-path/any`;
export const fetchImageByLevelApi = `${backendHost}/get-image-path/by-choice`;
export const attackImageApi = `${backendHost}/attack/predictions`;
export const fetchAttackedImageApi = `${backendHost}/attack/get-image`;

export const imageLocation = '/file-server/';

export const maxAttacks = 10;

export const difficultyList = ['Easy', 'Medium', 'Hard', 'Random'];

export const attackList = [
    {
        "id": "random_noise",
        "name": "Random Noise Attack",
        "description": "Adds 5% noise to the image.",
        "max_count": 2,
    },
    {
        "id": "rotation_clock",
        "name": "Rotate Clockwise Attack",
        "description": "Rotate the image clockwise by 45 degrees.",
        "max_count": 3,
    },
    {
        "id": "rotation_anti",
        "name": "Rotate Anti-clockwise Attack",
        "description": "Rotate the image anti-clockwise by 45 degrees.",
        "max_count": 3
    },
    {
        "id": "shifting_left",
        "name": "Shift Left Attack",
        "description": "Shift the image to the left by 30 pixels.",
        "max_count": 5
    },
    {
        "id": "shifting_right",
        "name": "Shift Right Attack",
        "description": "Shift the image to the right by 30 pixels.",
        "max_count": 5
    },
    {
        "id": "mirroring_vertical",
        "name": "Mirror Vertical Attack",
        "description": "Mirror / Flip the image vertically.",
        "max_count": 1
    },
    {
        "id": "mirroring_horizontal",
        "name": "Mirror Horizontal Attack",
        "description": "Mirror / Flip the image horizontally.",
        "max_count": 1
    },
    {
        "id": "shearing_vertical",
        "name": "Shear Vertical Attack",
        "description": "Shear the image vertically by 0.2 shearing factor.",
        "max_count": 1
    },
    {
        "id": "shearing_horizontal",
        "name": "Shear Horizontal Attack",
        "description": "Shear the image horizontally by 0.2 shearing factor.",
        "max_count": 1
    },
    {
        "id": "blur_image",
        "name": "Blur Attack",
        "description": "Blur the image.",
        "max_count": 2
    }
];