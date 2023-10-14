type Target = "_blank" | "_self" | "_parent";

export function redirectTo(to: string, target?: Target) {
    try {
        const link = document.createElement("a");
        link.href = to;
        link.target = target || "_blank";
        link.click();
    } catch (e) {
        console.log(e)
    }
}