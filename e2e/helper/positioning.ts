import { Locator } from '@playwright/test'

export async function isLeftOf(leftElement: Locator, rightElement: Locator) {
    const leftBox = await leftElement.boundingBox()
    const rightBox = await rightElement.boundingBox()

    if (!leftBox || !rightBox) {
        throw new Error('Elements not found')
    }

    return leftBox.x + leftBox.width <= rightBox.x
}
