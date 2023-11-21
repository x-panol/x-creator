export const arrows = {
    front: {
        position: [10, -9, 0],
        angle: [0, 0, 0],
    },
    back: {
        position: [-10, -9, 0],
        angle: [0, Math.PI, 0],
    },
    left: {
        position: [0, -9, -10],
        angle: [0, Math.PI / 2, 0],
    },
    right: {
        position: [0, -9, 10],
        angle: [0, -Math.PI / 2, 0],
    },
};

export const getId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`;
