import {Item} from './item';

export class GildedTros {

    constructor(public items: Array<Item>) {

    }

    public updateQuality(): void {
        for (const item of this.items) {
            this.updateItemQuality(item);
        }
    }


    private updateItemQuality(item: Item): void {
        if(item.sellIn<0){
            //B-DAWG Keychain: No changes needed
            if (item.name === "B-DAWG Keychain") {
                return;
            }
            //Good Wine increases in quality by 1
            if (item.name === "Good Wine") {
                item.quality++;
            } else if (item.name === "Backstage passes") {
                //Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
                //Quality drops to 0 after the conference
                if (item.sellIn <= 0) {
                    item.quality = 0;
                } else if (item.sellIn <= 5) {
                    item.quality+=3;
                } else if (item.sellIn <= 10) {
                    item.quality+=2;
                } else {
                    item.quality++;
                }
            //Smelly items degrade twice as fast
            } else if (["Duplicate Code", "Long Methods", "Ugly Variable Names"].includes(item.name)) {
                if(item.sellIn <=0 ){
                    item.quality-=4;
                } else {
                    item.quality-=2;
                }
            //All other items excluded from the business requirements follow the default procedure
            } else {
                if(item.sellIn <= 0 ){
                    item.quality-=2;
                } else {
                    item.quality--;
                }
            }
        }
       

        if (item.name !== "B-DAWG Keychain") {
            item.sellIn --;
        }

    }
}

