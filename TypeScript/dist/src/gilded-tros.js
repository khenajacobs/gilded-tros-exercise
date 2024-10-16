"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GildedTros = void 0;
class GildedTros {
    items;
    constructor(items) {
        this.items = items;
    }
    updateQuality() {
        for (const item of this.items) {
            this.updateItemQuality(item);
        }
    }
    updateItemQuality(item) {
        if (item.sellIn < 0) {
            if (item.name === "B-DAWG Keychain") {
                return;
            }
            if (item.name === "Good Wine") {
                item.quality++;
            }
            else if (item.name === "Backstage passes") {
                if (item.sellIn <= 0) {
                    item.quality = 0;
                }
                else if (item.sellIn <= 5) {
                    item.quality += 3;
                }
                else if (item.sellIn <= 10) {
                    item.quality += 2;
                }
                else {
                    item.quality++;
                }
            }
            else if (["Duplicate Code", "Long Methods", "Ugly Variable Names"].includes(item.name)) {
                if (item.sellIn <= 0) {
                    item.quality -= 4;
                }
                else {
                    item.quality -= 2;
                }
            }
            else {
                if (item.sellIn <= 0) {
                    item.quality -= 2;
                }
                else {
                    item.quality--;
                }
            }
        }
        if (item.name !== "B-DAWG Keychain") {
            item.sellIn--;
        }
    }
}
exports.GildedTros = GildedTros;
