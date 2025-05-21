export async function fetcher<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Error ${res.status}: No se pudo obtener los datos`);
    }
    return res.json();
}