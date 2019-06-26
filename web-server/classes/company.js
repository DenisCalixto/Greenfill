const Company = class Company {

    constructor(id, name, website, city, province, address, expiringItemnsNote, provideReusableItemsNotes, 
                recentHistory, comments, loosePercentage, discountExpiringItems, donateExpiringItems, 
                throwOutExpiringItems, sellInBulk, byo, extraChargeSingleItem, provideReusableItems, 
                employeesUseSingleUseItems, employeesSingleUseItemsNotes) {

        this.id = id;
        this.name = name;
        this.website = website;
        this.city = city;
        this.province = province;
        this.address = address;
        this.expiringItemnsNote = expiringItemnsNote;
        this.provideReusableItemsNotes = provideReusableItemsNotes;
        this.recentHistory = recentHistory;
        this.comments = comments;
        this.loosePercentage = loosePercentage;
        this.discountExpiringItems = discountExpiringItems;
        this.donateExpiringItems = donateExpiringItems;
        this.throwOutExpiringItems = throwOutExpiringItems;
        this.sellInBulk = sellInBulk;
        this.byo = byo;
        this.extraChargeSingleItem = extraChargeSingleItem;
        this.provideReusableItems = provideReusableItems;
        this.employeesUseSingleUseItems = employeesUseSingleUseItems;
        this.employeesSingleUseItemsNotes = employeesSingleUseItemsNotes;
        
    }

}

module.exports = {
    Company
}