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
        "description": "Adds 10% noise to the image."
    },
    {
        "id": "rotation_clock",
        "name": "Rotate Clockwise Attack",
        "description": "Rotate the image clockwise by 45 degrees."
    },
    {
        "id": "rotation_anti",
        "name": "Rotate Anti-clockwise Attack",
        "description": "Rotate the image anti-clockwise by 45 degrees."
    },
    {
        "id": "shifting_left",
        "name": "Shift Left Attack",
        "description": "Shift the image to the left by 30 pixels."
    },
    {
        "id": "shifting_right",
        "name": "Shift Right Attack",
        "description": "Shift the image to the right by 30 pixels."
    },
    {
        "id": "mirroring_vertical",
        "name": "Mirror Vertical Attack",
        "description": "Mirror / Flip the image vertically."
    },
    {
        "id": "mirroring_horizontal",
        "name": "Mirror Horizontal Attack",
        "description": "Mirror / Flip the image horizontally."
    },
];