export default async function bulkAsync<T>(actions: (() => Promise<T>)[], throwError = false) {
    type Response = { data?: T, error?: string }

    const total = actions.length;
    let count = 0;

    const info = {
        total,
        successful: 0,
        failed: 0,
        result: [] as Response[]
    }

    return new Promise((resolve, reject) => {

        for (let i = 0; i < total; i++) {
            const action = actions[i];
            action()
                .then((data) => {
                    info.successful++;
                    info.result[i] = { data };
                })
                .catch((e) => {
                    info.failed++;
                    info.result[i] = { error: e?.message || "Failed" };
                })
                .finally(() => {
                    count++;
                    if (count >= total) {
                        if (throwError) {
                            if (info.failed > 0) reject(info)
                            else resolve(info)
                        } else {
                            resolve(info)
                        }
                    }
                })
        }
    }) as Promise<typeof info>
}