import dayjs from 'dayjs'

export function withoutDurationPlugin(): { setup: () => void; restore: () => void } {
    let originalIsDuration: typeof dayjs.isDuration | null = null

    return {
        setup() {
            if (originalIsDuration !== null) {
                throw new Error('Plugin already removed')
            }

            originalIsDuration = dayjs.isDuration

            // @ts-expect-error
            delete dayjs.isDuration
        },
        restore() {
            if (originalIsDuration === null) {
                throw new Error('Plugin not removed')
            }

            dayjs.isDuration = originalIsDuration
        },
    }
}
