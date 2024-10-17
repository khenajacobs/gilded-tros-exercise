import { ItemName } from './gilder-tros-item-names.enum';
import { Item } from './item';

export class GildedTros {

    //Quality value properties 
    private MAXIMUM_QUALITY_VALUE: number = 50
    private MINIMUM_QUALITY_VALUE: number = 0

    constructor(public items: Array<Item>) {}

    public updateQuality(): void {
        for (const item of this.items) {
            this.updateItemQuality(item);
        }
    }

    private updateItemQuality(item: Item): void {
        switch (item.name) {
            //B-Dawg contains no business rules
            case ItemName.B_DAWG_KEYCHAIN:
            break;
            // Good wine business rule(s)
            case ItemName.GOOD_WINE:
                this.increaseQuality(item, 1);
            break;
            // Backstage passes quality business rules
            case ItemName.BACKSTAGE_PASSES:
                if (item.sellIn <= 0) {
                    item.quality = 0;
                } else if (item.sellIn <= 5) {
                    this.increaseQuality(item, 3);
                } else if (item.sellIn <= 10) {
                    this.increaseQuality(item, 2);
                } else {
                    this.increaseQuality(item, 1);
                }
            break;
            // Smelly items business rule(s)
            case ItemName.DUPLICATE_CODE:
            case ItemName.LONG_METHODS:
            case ItemName.UGLY_VARIABLE_NAMES:
                this.decreaseQuality(item, item.sellIn <= 0 ? 4 : 2);
            break;
        
            // All other values business rule(s)
            default:
                this.decreaseQuality(item, item.sellIn <= 0 ? 2 : 1);
            break;
        }
        
        //Lower sellIn for all but B-Dawg values
        if (item.name != ItemName.B_DAWG_KEYCHAIN) {
            item.sellIn--;
        }
    }

    private increaseQuality(item: Item, amount: number): void {
        //The item quality cannot exceed 50, therefor we either set the quality to quality + amount or 50
        item.quality = Math.min(this.MAXIMUM_QUALITY_VALUE, item.quality + amount);
    }

    private decreaseQuality(item: Item, amount: number): void {
        //The item quality cannot go below 0, therefor we either set the quality to quality - amount or 0
        item.quality = Math.max(this.MINIMUM_QUALITY_VALUE, item.quality - amount);
    }
}
