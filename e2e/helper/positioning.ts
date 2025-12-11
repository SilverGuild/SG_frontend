import { Locator } from '@playwright/test'

export async function isLeftOf(leftElement: Locator, rightElement: Locator) {
    await leftElement.waitFor({ state: 'visible', timeout: 15000 })
    await rightElement.waitFor({ state: 'visible', timeout: 15000 })

    const leftBox = await leftElement.boundingBox()
    const rightBox = await rightElement.boundingBox()

    if (!leftBox || !rightBox) {
        throw new Error('Elements not found')
    }

    return leftBox.x + leftBox.width <= rightBox.x
}
