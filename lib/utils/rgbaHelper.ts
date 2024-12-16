function rgbaObjectToString(rgba: any) {
    const { r, g, b, a } = rgba;
    if (r === undefined || g === undefined || b === undefined || a === undefined) {
        throw new Error("RGBA object must have r, g, b, and a properties.");
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}


function rgbaStringToObject(rgbaString: string) {
    const regex = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)$/;
    const match = rgbaString.match(regex);

    if (!match) {
        throw new Error("Invalid RGBA string format.");
    }

    const [, r, g, b, a] = match;
    return {
        r: parseInt(r, 10),
        g: parseInt(g, 10),
        b: parseInt(b, 10),
        a: parseFloat(a)
    };
}


export {rgbaObjectToString, rgbaStringToObject}