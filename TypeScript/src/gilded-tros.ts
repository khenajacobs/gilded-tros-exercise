import { ItemName } from './gilder-tros-item-names.enum';
import { Item } from './item';

export class GildedTros {

    constructor(public items: Array<Item>) {}

    public updateQuality(): void {
        for (const item of this.items) {
            this.updateItemQuality(item);
        }
    }

    private updateItemQuality(item: Item): void {
        if (item.name === ItemName.B_DAWG_KEYCHAIN as string) {
            return;
        }

        //Good wine business rule(s)
        if (item.name == ItemName.GOOD_WINE) {
            this.increaseQuality(item, 1);
        //Backstage passes quality business rules
        } else if (item.name == ItemName.BACKSTAGE_PASSES) {
            if (item.sellIn <= 0) {
                item.quality = 0;

            } else if (item.sellIn <= 5) {
                this.increaseQuality(item, 3);
            } else if (item.sellIn <= 10) {
                this.increaseQuality(item, 2);
            } else {
                this.increaseQuality(item, 1);
            }
        //Smelly items business rule(s)
        } else if ([ItemName.DUPLICATE_CODE as string, ItemName.LONG_METHODS as string, ItemName.UGLY_VARIABLE_NAMES as string].includes(item.name)) {
            //sellIn value larger than 0, we decrease the quality by 4, else by 2
            this.decreaseQuality(item, item.sellIn <= 0 ? 4 : 2);
        //All other values business rule(s)
        } else {
            //sellIn value larger than 0, we decrease the quality by 2, else by 1
            this.decreaseQuality(item, item.sellIn <= 0 ? 2 : 1);
        }

        //Lower sellIn for all but B-Dawg values
        if (item.name != ItemName.B_DAWG_KEYCHAIN) {
            item.sellIn--;
        }
    }

    private increaseQuality(item: Item, amount: number): void {
        //The item quality cannot exceed 50, therefor we either set the quality to quality + amount or 50
        item.quality = Math.min(50, item.quality + amount);
    }

    private decreaseQuality(item: Item, amount: number): void {
        //The item quality cannot go below 0, therefor we either set the quality to quality - amount or 0
        item.quality = Math.max(0, item.quality - amount);
    }
}
