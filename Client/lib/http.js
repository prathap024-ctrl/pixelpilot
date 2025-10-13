const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function httpGet(path, options) {
    const response = await fetch(base + path, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers
        }
    })

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json()
}