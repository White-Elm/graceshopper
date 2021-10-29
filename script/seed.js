'use strict'

const {db, models: {Admin, Cart, Customer, Invoice, Product, ProductType, Room, User}} = require('../server/db')
const faker = require('faker');
const e = require('express');


const productArr = [];
for(let i = 0; i<50; i++){
  productArr.push(Math.round(Math.random()*19))
}

const livingRoomTypes = ['Couch', 'Coffee Table', 'End Table', 'TV Stand', 'Love Seat', 'Rug', 'Lamp', 'Shelf']
const bedRoomTypes = ['Bed', 'Night Stand', 'Dresser', 'Desk', 'Computer Chair', 'Lamp', 'Rug', 'Shelf', 'Wardrobe']
const kitchenTypes = ['Cabinets', 'Pots & Pans', 'Dishes', 'Appliances']
const diningRoomTypes = ['Dining Table', 'Dining Chair', 'Cabinets', 'Lamp']
const productTypesArr = ['Couch', 'Coffee Table', 'End Table', 'TV Stand', 'Love Seat', 'Rug', 'Lamp', 'Shelf','Bed', 'Night Stand', 'Dresser', 'Desk', 'Computer Chair', 'Wardrobe', 'Cabinets', 'Pots & Pans', 'Dishes', 'Appliances', 'Dining Table', 'Dining Chair']
const roomTypes = ['Living Room', 'Bed Room', 'Kitchen', 'Dining Room']

//Product Image Urls organized by type of product
const productImgs = [
  {
    "Room": "Couch'",
    "1": "https://www.ikea.com/us/en/images/products/friheten-sleeper-sofa-skiftebo-dark-gray__0829149_pe644867_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/friheten-sleeper-sofa-hyllie-beige__0690272_pe723195_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/friheten-sleeper-sofa-skiftebo-blue__0690278_pe723201_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/friheten-sleeper-sofa-bomstad-black__0620065_pe689376_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/froesloev-sofa-hyllie-dark-gray__0995164_pe821608_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/froesloev-sofa-hyllie-beige__0995157_pe821601_s5.jpg?f=xl",
    "7": "https://www.ikea.com/us/en/images/products/slatorp-sofa-with-chaise-tallmyra-white-black__0818177_pe774338_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/slatorp-sofa-with-chaise-tallmyra-white-black__0818177_pe774338_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/uppland-sofa-remmarn-light-gray__0924993_pe788685_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/uppland-sofa-virestad-red-white__0818574_pe774496_s5.jpg?f=xs",
    "11": "https://www.ikea.com/us/en/images/products/uppland-sofa-blekinge-white__0818564_pe774486_s5.jpg?f=xl",
    "12": "https://www.ikea.com/us/en/images/products/uppland-sofa-totebo-dark-turquoise__0818570_pe774492_s5.jpg?f=xs",
    "13": "https://www.ikea.com/us/en/images/products/uppland-sofa-with-chaise-totebo-light-beige__0818586_pe774508_s5.jpg?f=xs",
    "14": "https://www.ikea.com/us/en/images/products/uppland-sofa-with-chaise-hallarp-gray__0818578_pe774500_s5.jpg?f=xl",
    "15": "https://www.ikea.com/us/en/images/products/uppland-sofa-with-chaise-hallarp-beige__0818580_pe774502_s5.jpg?f=xs",
    "16": "https://www.ikea.com/us/en/images/products/soederhamn-sectional-4-seat-with-chaise-samsta-dark-gray__0666468_pe713559_s5.jpg?f=xs",
    "17": "https://www.ikea.com/us/en/images/products/soederhamn-sectional-4-seat-with-chaise-samsta-orange__0802728_pe768567_s5.jpg?f=xs",
    "18": "https://www.ikea.com/us/en/images/products/soederhamn-sectional-4-seat-with-chaise-viarp-beige-brown__0802731_pe768570_s5.jpg?f=xl",
    "19": "https://www.ikea.com/us/en/images/products/soederhamn-sectional-4-seat-with-chaise-finnsta-turquoise__0826312_pe713557_s5.jpg?f=xs",
    "20": "https://www.ikea.com/us/en/images/products/finnala-sofa-with-chaise-dalstorp-multicolor__0827770_ph163108_s5.jpg?f=xs"
  },
  {
    "Room": " 'Coffee Table'",
    "1": "https://www.ikea.com/us/en/images/products/lack-coffee-table-white__0702217_pe724349_s5.jpg?f=xxs",
    "2": "https://www.ikea.com/us/en/images/products/lack-coffee-table-black-brown__0835835_pe601383_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/lack-coffee-table-black-brown__0836233_pe601379_s5.jpg?f=xl",
    "4": "https://www.ikea.com/us/en/images/products/lack-coffee-table-white-stained-oak-effect__0837100_pe709586_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/lack-coffee-table-white__0702214_pe724347_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/hemnes-coffee-table-black-brown__0837153_pe601368_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/hemnes-coffee-table-white-stain-light-brown__0835683_pe671195_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/vittsjoe-coffee-table-black-brown-glass__0836655_pe601386_s5.jpg?f=xxs",
    "9": "https://www.ikea.com/us/en/images/products/lunnarp-coffee-table-brown__0836846_pe675311_s5.jpg?f=xxs",
    "10": "https://www.ikea.com/us/en/images/products/tofteryd-coffee-table-high-gloss-white__0835848_pe601373_s5.jpg?f=xxs",
    "11": "https://www.ikea.com/us/en/images/products/tofteryd-coffee-table-high-gloss-black__0836147_pe601371_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/stockholm-coffee-table-walnut-veneer__0836022_pe601366_s5.jpg?f=xs",
    "13": "https://www.ikea.com/us/en/images/products/havsta-coffee-table-dark-brown__0835910_pe694772_s5.jpg?f=xs",
    "14": "https://www.ikea.com/us/en/images/products/havsta-coffee-table-gray__0837085_pe694773_s5.jpg?f=xs",
    "15": "https://www.ikea.com/us/en/images/products/havsta-coffee-table-white__0724437_pe734398_s5.jpg?f=xs",
    "16": "https://www.ikea.com/us/en/images/products/listerby-coffee-table-white-stained-oak__0837090_pe693239_s5.jpg?f=xs",
    "17": "https://www.ikea.com/us/en/images/products/nyboda-coffee-table-w-reversible-table-top-light-gray-concrete-effect-white__0766532_pe753817_s5.jpg?f=xs",
    "18": "https://www.ikea.com/us/en/images/products/nyboda-coffee-table-w-reversible-table-top-dark-gray-concrete-effect-black__0766530_pe753815_s5.jpg?f=xs",
    "19": "https://www.ikea.com/us/en/images/products/lack-nesting-tables-set-of-2-black-white__0836801_pe624944_s5.jpg?f=xs",
    "20": "https://www.ikea.com/us/en/images/products/lack-nesting-tables-set-of-2-gray__0836721_pe627331_s5.jpg?f=xs"
  },
  {
    "Room": " 'End Table'",
    "1": "https://www.ikea.com/us/en/images/products/lack-side-table-black__0836736_pe601411_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/lack-side-table-white-green__0804434_pe769183_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/lack-side-table-white__0702208_pe724343_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/nyboda-side-table-w-reversible-table-top-light-gray-concrete-effect-white__0766538_pe753818_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/nyboda-side-table-w-reversible-table-top-dark-gray-concrete-effect-black__0766537_pe753822_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/lunnarp-side-table-white__0836051_pe675474_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/lunnarp-side-table-brown__0836261_pe675473_s5.jpg?f=xl",
    "8": "https://www.ikea.com/us/en/images/products/fjaellbo-side-table-with-storage-black__0996614_pe822413_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/listerby-side-table-brown__0836854_pe693244_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/listerby-side-table-white-stained-oak__0835679_pe686083_s5.jpg?f=xs",
    "11": "https://www.ikea.com/us/en/images/products/kragsta-nesting-tables-set-of-2-white__0835756_pe603107_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/kragsta-nesting-tables-set-of-2-black__0836677_pe603108_s5.jpg?f=xs",
    "13": "https://www.ikea.com/us/en/images/products/malmsta-side-table-black-brown__0835628_pe601405_s5.jpg?f=xs",
    "14": "https://www.ikea.com/us/en/images/products/lack-side-table-high-gloss-white__0835604_pe601425_s5.jpg?f=xs",
    "15": "https://www.ikea.com/us/en/images/products/burvik-side-table-white__0835790_pe667051_s5.jpg?f=xs",
    "16": "https://www.ikea.com/us/en/images/products/burvik-side-table-black__0836683_pe667039_s5.jpg?f=xs",
    "17": "https://www.ikea.com/us/en/images/products/lisabo-side-table-ash-veneer__0837195_pe601413_s5.jpg?f=xs",
    "18": "https://www.ikea.com/us/en/images/products/lindved-side-table-white__0658465_pe710224_s5.jpg?f=xs",
    "19": "https://www.ikea.com/us/en/images/products/tingby-side-table-on-casters-white__0726714_ph143344_s5.jpg?f=xs",
    "20": "https://www.ikea.com/us/en/images/products/tingby-side-table-on-casters-gray__0836727_pe618492_s5.jpg?f=xs"
  },
  {
    "Room": " 'TV Stand'",
    "1": "https://www.ikea.com/us/en/images/products/lack-tv-unit-black__0850607_pe561986_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/fjaellbo-tv-unit-black__0959710_pe806151_s5.jpg?f=xl",
    "3": "https://www.ikea.com/us/en/images/products/kallax-lack-storage-combination-with-shelf-black-brown__0956115_pe804528_s5.jpg?f=xxs",
    "4": "https://www.ikea.com/us/en/images/products/besta-tv-unit-with-doors-white-lappviken-white__0723576_pe734034_s5.jpg?f=xxs",
    "5": "https://www.ikea.com/us/en/images/products/besta-tv-unit-with-doors-black-brown-selsviken-high-gloss-brown__0723572_pe734032_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/besta-tv-unit-with-doors-black-brown-hanviken-black-brown__0723581_pe734035_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/besta-tv-unit-black-brown-lappviken-black-brown__0761020_pe751034_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/besta-tv-unit-white-lappviken-white__0761023_pe751032_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/besta-tv-unit-walnut-effect-light-gray-lappviken-walnut-effect-light-gray__0761021_pe751050_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/besta-tv-bench-with-doors-white-lappviken-stubbarp-white__0999623_pe823675_s5.jpg?f=xs",
    "11": "https://www.ikea.com/us/en/images/products/besta-tv-bench-with-doors-walnut-effect-light-gray-lappviken-stubbarp-walnut-effect-light-gray__0999577_pe823692_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/laiva-brimnes-tv-storage-combination-black-brown__0955667_pe803954_s5.jpg?f=xl",
    "13": "https://www.ikea.com/us/en/images/products/besta-tv-unit-with-doors-and-drawers-black-brown-lappviken-stubbarp-black-brown__0747004_pe744336_s5.jpg?f=xs",
    "14": "https://www.ikea.com/us/en/images/products/besta-tv-unit-with-doors-and-drawers-walnut-effect-light-gray-lappviken-stubbarp-walnut-effect-light-gray__0995029_pe821665_s5.jpg?f=xs",
    "15": "https://www.ikea.com/us/en/images/products/besta-tv-storage-combination-glass-doors-black-brown-lappviken-black-brown-clear-glass__0729256_pe736822_s5.jpg?f=xxs",
    "16": "https://www.ikea.com/us/en/images/products/brimnes-tv-storage-combination-black__0850943_pe689091_s5.jpg?f=xxs",
    "17": "https://www.ikea.com/us/en/images/products/hauga-tv-storage-combination-white__0976536_ph173351_s5.jpg?f=xxs",
    "18": "https://www.ikea.com/us/en/images/products/brimnes-tv-storage-combination-glass-doors-white__0850809_pe689096_s5.jpg?f=xxs",
    "19": "https://www.ikea.com/us/en/p/fjaellbo-tv-storage-combination-black-s79191266/",
    "20": "https://www.ikea.com/us/en/images/products/hemnes-tv-storage-combination-black-brown-light-brown-clear-glass__0824741_pe776187_s5.jpg?f=xxs"
  },
  {
    "Room": " 'Love Seat'",
    "1": "https://www.ikea.com/us/en/images/products/glostad-loveseat-knisa-dark-gray__0950898_pe800738_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/glostad-loveseat-knisa-medium-blue__0950902_pe800742_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/klippan-loveseat-bomstad-black__0827136_pe709127_s5.jpg?f=xxs",
    "4": "https://www.ikea.com/us/en/images/products/uppland-loveseat-hallarp-gray__0818536_pe774467_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/uppland-loveseat-virestad-red-white__0818551_pe774482_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/uppland-loveseat-totebo-light-beige__0818548_pe774479_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/uppland-loveseat-totebo-dark-turquoise__0818545_pe774476_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/vinliden-loveseat-hillared-anthracite__0852735_pe780232_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/vinliden-loveseat-hakebo-light-turquoise__0938987_pe794365_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/vinliden-loveseat-hakebo-beige__0852699_pe780207_s5.jpg?f=xs",
    "11": "https://www.ikea.com/us/en/images/products/morabo-loveseat-gunnared-dark-gray-wood__0815926_pe773113_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/morabo-loveseat-djuparp-dark-blue-wood__0990490_pe819007_s5.jpg?f=xs",
    "13": "https://www.ikea.com/us/en/images/products/kivik-loveseat-hillared-dark-blue__0788727_pe763708_s5.jpg?f=xs",
    "14": "https://www.ikea.com/us/en/images/products/kivik-loveseat-skiftebo-dark-gray__0788732_pe763703_s5.jpg?f=xs",
    "15": "https://www.ikea.com/us/en/images/products/kivik-loveseat-hillared-anthracite__0788725_pe763701_s5.jpg?f=xs",
    "16": "https://www.ikea.com/us/en/images/products/soederhamn-loveseat-with-chaise-samsta-dark-gray__0666210_pe713456_s5.jpg?f=xxs",
    "17": "https://www.ikea.com/us/en/images/products/haerlanda-loveseat-ljungen-medium-gray__0787526_pe763271_s5.jpg?f=xxs",
    "18": "https://www.ikea.com/us/en/images/products/kivik-loveseat-grann-bomstad-black__0788723_pe763699_s5.jpg?f=xs",
    "19": "https://www.ikea.com/us/en/images/products/morabo-loveseat-grann-bomstad-golden-brown-wood__0815920_pe773107_s5.jpg?f=xxs",
    "20": "https://www.ikea.com/us/en/images/products/vallentuna-modular-loveseat-with-storage-hillared-beige__0938387_pe794098_s5.jpg?f=xxs"
  },
  {
    "Room": " 'Rug'",
    "1": "https://www.ikea.com/us/en/images/products/tiphede-rug-flatwoven-natural-black__0772065_pe755878_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/tiphede-rug-flatwoven-black-natural__0772068_pe755881_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/langsted-rug-low-pile-yellow__0661980_pe711674_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/langsted-rug-low-pile-light-blue__0936208_pe793173_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/langsted-rug-low-pile-light-gray__0777950_pe759302_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/vindum-rug-high-pile-white__0891797_pe690078_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/vindum-rug-high-pile-green__0770691_pe755603_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/vindum-rug-high-pile-blue-green__0894105_pe642947_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/toftlund-rug-white__0891782_pe688131_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/toftlund-rug-gray__0834499_pe778810_s5.jpg?f=xl",
    "11": "https://www.ikea.com/us/en/images/products/vollerslev-rug-high-pile-gray__1021444_pe832120_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/romdrup-rug-low-pile-beige-antique-look-floral-patterned__0891917_pe735505_s5.jpg?f=xs",
    "13": "https://www.ikea.com/us/en/images/products/toerslev-rug-flatwoven-stripe-white-black__0892068_pe688136_s5.jpg?f=xs",
    "14": "https://www.ikea.com/us/en/images/products/stangerum-rug-high-pile-gray__0830986_pe776962_s5.jpg?f=xs",
    "15": "https://www.ikea.com/us/en/images/products/halved-rug-flatwoven-handmade-multicolor__0891754_pe609762_s5.jpg?f=xs",
    "16": "https://www.ikea.com/us/en/images/products/soenderoed-rug-high-pile-blue__0891822_pe620926_s5.jpg?f=xs",
    "17": "https://www.ikea.com/us/en/images/products/tannisby-rug-flatwoven-handmade-gray-black__0937530_pe793779_s5.jpg?f=xs",
    "18": "https://www.ikea.com/us/en/images/products/tanum-rug-flatwoven-assorted-colors__0251423_pe390013_s5.jpg?f=m",
    "19": "https://www.ikea.com/us/en/images/products/karismatisk-rug-set-of-3-multicolor__1007230_pe826657_s5.jpg?f=xs",
    "20": "https://www.ikea.com/us/en/images/products/karismatisk-rug-low-pile-multicolor__1007224_pe826651_s5.jpg?f=xs"
  },
  {
    "Room": " 'Lamp'",
    "1": "https://www.ikea.com/us/en/images/products/ypperlig-led-floor-lamp-dark-gray__0880234_pe634553_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/nymoe-lamp-shade-black-brass-color__0880539_pe632568_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/naevlinge-led-clamp-spotlight-white__0726711_pe735399_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/tagarp-floor-uplighter-with-light-bulb-black-white__0810839_pe771437_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/tokabo-table-lamp-with-led-bulb-glass-opal__0701671_pe724202_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/lauters-floor-lamp-with-led-bulb-ash-white__0879908_pe714870_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/barlast-floor-lamp-with-led-bulb-black-white__0957677_pe805131_s5.jpg?f=xl",
    "8": "https://www.ikea.com/us/en/images/products/naevlinge-led-work-lamp-black__0725897_pe735091_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/vickleby-floor-lamp-with-led-bulb-white-handmade__0963286_pe808445_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/naevlinge-led-floor-read-lamp-white__0751187_pe746950_s5.jpg?f=xs",
    "11": "https://www.ikea.com/us/en/images/products/taernaby-table-lamp-with-led-bulb-anthracite__0747833_ph155459_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/solbo-table-lamp-white-owl__0883240_pe645478_s5.jpg?f=xxs",
    "13": "https://www.ikea.com/us/en/images/products/lauters-table-lamp-with-led-bulb-ash-white__0879402_pe714879_s5.jpg?f=xxs",
    "14": "https://www.ikea.com/us/en/images/products/lampan-table-lamp-with-led-bulb-white__0879285_pe632935_s5.jpg?f=xxs",
    "15": "https://www.ikea.com/us/en/images/products/lersta-floor-reading-lamp-with-led-bulb-aluminum__0879517_pe611365_s5.jpg?f=xxs",
    "16": "https://www.ikea.com/us/en/images/products/misterhult-table-lamp-with-led-bulb-bamboo-handmade__0789070_pe763808_s5.jpg?f=xxs",
    "17": "https://www.ikea.com/us/en/images/products/svallet-work-lamp-with-led-bulb-dark-gray-white__0881047_pe724753_s5.jpg?f=xxs",
    "18": "https://www.ikea.com/us/en/images/products/tertial-work-lamp-with-led-bulb-dark-gray__0879117_pe622662_s5.jpg?f=xxs",
    "19": "https://www.ikea.com/us/en/images/products/hovnaes-floor-lamp-chrome-plated__0879838_pe622450_s5.jpg?f=xxs",
    "20": "https://www.ikea.com/us/en/images/products/solklint-table-lamp-with-led-bulb-brass-gray-clear-glass__0842258_pe781834_s5.jpg?f=xs"
  },
  {
    "Room": " 'Shelf'",
    "1": "https://www.ikea.com/us/en/images/products/mosslanda-picture-ledge-black__0905701_pe556435_s5.jpg?f=xl",
    "2": "https://www.ikea.com/us/en/images/products/mosslanda-picture-ledge-pale-pink__1006956_pe825920_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/mosslanda-picture-ledge-white__0905845_pe556438_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/mosslanda-picture-ledge-walnut-effect__1006960_pe825923_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/laiva-bookcase-black-brown__0394575_pe561398_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__0400165_pe564141_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/kallax-shelf-unit-black-brown__0400167_pe564143_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/kallax-shelf-unit-walnut-effect-light-gray__0541542_pe653645_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__0400099_pe564091_s5.jpg?f=xxs",
    "10": "https://www.ikea.com/us/en/images/products/omar-shelf-unit-galvanized__0911610_pe616784_s5.jpg?f=xxs",
    "11": "https://www.ikea.com/us/en/images/products/billy-bookcase-white__1051907_pe845796_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/billy-bookcase-black-brown__1051904_pe845793_s5.jpg?f=xs",
    "13": "https://www.ikea.com/us/en/images/products/lack-wall-shelf-unit-white__0676618_pe718730_s5.jpg?f=xs",
    "14": "https://www.ikea.com/us/en/images/products/lack-wall-shelf-unit-white-stained-oak-effect__0676619_pe718732_s5.jpg?f=xs",
    "15": "https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__0400115_pe564107_s5.jpg?f=xs",
    "16": "https://www.ikea.com/us/en/images/products/kallax-shelf-unit-gray-wood-effect__0494559_pe627164_s5.jpg?f=xs",
    "17": "https://www.ikea.com/us/en/images/products/bekvaem-spice-rack-aspen__0980362_pe814907_s5.jpg?f=xs",
    "18": "https://www.ikea.com/us/en/images/products/bergshult-pershult-wall-shelf-brown-black-white__0850835_pe718689_s5.jpg?f=xxs",
    "19": "https://www.ikea.com/us/en/images/products/bergshult-granhult-wall-shelf-dark-gray-nickel-plated__0850250_pe720943_s5.jpg?f=xxs",
    "20": "https://www.ikea.com/us/en/images/products/jonaxel-shelf-unit-white__0678050_pe719166_s5.jpg?f=xxs"
  },
  {
    "Room": "'Bed'",
    "1": "https://www.ikea.com/us/en/images/products/slattum-upholstered-bed-frame-knisa-light-gray__0726695_pe735410_s5.jpg?f=xxs",
    "2": "https://www.ikea.com/us/en/images/products/hemnes-daybed-frame-with-3-drawers-white__0860902_pe644899_s5.jpg?f=xxs",
    "3": "https://www.ikea.com/us/en/images/products/hauga-upholstered-bed-frame-vissle-gray__0789235_pe764317_s5.jpg?f=xxs",
    "4": "https://www.ikea.com/us/en/images/products/yttervag-four-poster-bed-frame-black-luroey__1014361_pe829630_s5.jpg?f=xxs",
    "5": "https://www.ikea.com/us/en/images/products/tufjord-upholstered-bed-frame-djuparp-dark-green__0859749_pe781086_s5.jpg?f=xxs",
    "6": "https://www.ikea.com/us/en/images/products/grimsbu-bed-frame-gray-luroey__0750211_pe747233_s5.jpg?f=xxs",
    "7": "https://www.ikea.com/us/en/images/products/idanaes-upholstered-bed-frame-gunnared-dark-gray__0971544_pe811389_s5.jpg?f=xxs",
    "8": "https://www.ikea.com/us/en/images/products/gladstad-upholstered-bed-frame-kabusa-light-gray__0984367_pe816242_s5.jpg?f=xxs",
    "9": "https://www.ikea.com/us/en/images/products/malm-storage-bed-white__0594850_pe676177_s5.jpg?f=xxs",
    "10": "https://www.ikea.com/us/en/images/products/utaker-stackable-bed-pine__0860737_pe649179_s5.jpg?f=xxs",
    "11": "https://www.ikea.com/us/en/images/products/kura-reversible-bed-white-pine__0937447_pe793736_s5.jpg?f=xxs",
    "12": "https://www.ikea.com/us/en/images/products/malm-high-bed-frame-2-storage-boxes-black-brown-luroey__0861200_pe662086_s5.jpg?f=xxs",
    "13": "https://www.ikea.com/us/en/images/products/vadheim-upholstered-bed-frame-gunnared-light-green__0859687_pe781078_s5.jpg?f=xxs",
    "14": "https://www.ikea.com/us/en/images/products/malm-bed-frame-high-black-brown-luroey__0860726_pe662081_s5.jpg?f=xxs",
    "15": "https://www.ikea.com/us/en/images/products/nordli-bed-frame-with-storage-white__0860859_pe639645_s5.jpg?f=xxs",
    "16": "https://www.ikea.com/us/en/images/products/hemnes-daybed-frame-with-3-drawers-black-brown__0860990_pe694491_s5.jpg?f=xxs",
    "17": "https://www.ikea.com/us/en/images/products/idanaes-upholstered-bed-frame-gunnared-pale-pink__0971545_pe811392_s5.jpg?f=xxs",
    "18": "https://www.ikea.com/us/en/images/products/blakullen-uph-bed-frame-with-corner-headboard-knisa-medium-blue__1036897_pe838565_s5.jpg?f=xxs",
    "19": "https://www.ikea.com/us/en/images/products/slattum-upholstered-bed-frame-knisa-light-gray__0726732_pe735405_s5.jpg?f=xxs",
    "20": "https://www.ikea.com/us/en/images/products/hemnes-bed-frame-black-brown-luroey__0861234_pe660121_s5.jpg?f=xxs"
  },
  {
    "Room": " 'Night Stand'",
    "1": "https://www.ikea.com/us/en/images/products/knarrevik-nightstand-black__0858302_pe669481_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/knarrevik-nightstand-light-gray-blue__1010426_pe828061_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/malm-2-drawer-chest-white-stained-oak-veneer__0379924_pe554966_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/malm-2-drawer-chest-white__0380791_pe555670_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/brimnes-nightstand-black__0439568_pe592286_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/idanaes-nightstand-dark-brown-stained__0931773_pe791242_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/idanaes-nightstand-white__0931775_pe791215_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/hemnes-nightstand-black-brown__0858447_pe670723_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/hemnes-nightstand-dark-gray-stained__0524625_pe644419_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/hemnes-3-drawer-chest-white-stain__1045638_pe842683_s5.jpg?f=xs",
    "11": "https://www.ikea.com/us/en/images/products/hemnes-3-drawer-chest-black-brown__0822469_pe775645_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/tarva-nightstand-pine__0380436_pe555357_s5.jpg?f=xxs",
    "13": "https://www.ikea.com/us/en/images/products/trysil-nightstand-dark-brown-black__0380553_pe555452_s5.jpg?f=xxs",
    "14": "https://www.ikea.com/us/en/images/products/vikhammer-nightstand-black__0858511_pe665937_s5.jpg?f=xxs",
    "15": "https://www.ikea.com/us/en/images/products/bjoerksnaes-nightstand-birch__0598066_pe677436_s5.jpg?f=xxs",
    "16": "https://www.ikea.com/us/en/images/products/nordkisa-nightstand-bamboo__0756023_pe748743_s5.jpg?f=xxs",
    "17": "https://www.ikea.com/us/en/images/products/gursken-nightstand-light-beige__0939777_pe794666_s5.jpg?f=xxs",
    "18": "https://www.ikea.com/us/en/images/products/tyssedal-nightstand-white__0858455_ph124559_s5.jpg?f=xxs",
    "19": "https://www.ikea.com/us/en/images/products/setskog-nightstand-black__0858406_pe646880_s5.jpg?f=xxs",
    "20": "https://www.ikea.com/us/en/images/products/hauga-nightstand-gray__1010406_pe828056_s5.jpg?f=xs"
  },
  {
    "Room": " 'Dresser'",
    "1": "https://www.ikea.com/us/en/images/products/hemnes-8-drawer-dresser-dark-gray-stained__0520151_pe642029_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/hemnes-8-drawer-dresser-black-brown__0132796_pe193829_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/hemnes-8-drawer-dresser-white-stain__0858919_pe554983_s5.jpg?f=xl",
    "4": "https://www.ikea.com/us/en/images/products/malm-6-drawer-dresser-white__0859014_pe624334_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/malm-6-drawer-dresser-black-brown__0869102_pe624328_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/koppang-6-drawer-dresser-white__0778092_pe758833_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/koppang-6-drawer-dresser-black-brown__0778088_pe758832_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/malm-3-drawer-chest-white-stained-oak-veneer__0858463_pe678763_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/brimnes-4-drawer-dresser-white-frosted-glass__0500939_pe631491_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/brimnes-4-drawer-dresser-black-frosted-glass__0500936_pe631494_s5.jpg?f=xs",
    "11": "https://www.ikea.com/us/en/images/products/hemnes-3-drawer-chest-white-stain__0858195_pe556047_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/hemnes-3-drawer-chest-dark-gray-stained__0520145_pe642027_s5.jpg?f=xs",
    "13": "https://www.ikea.com/us/en/images/products/hauga-6-drawer-dresser-white__0931926_pe791316_s5.jpg?f=xxs",
    "14": "https://www.ikea.com/us/en/images/products/tarva-6-drawer-chest-pine__0857784_pe628892_s5.jpg?f=xxs",
    "15": "https://www.ikea.com/us/en/images/products/songesand-6-drawer-dresser-brown__0858247_pe658933_s5.jpg?f=xxs",
    "16": "https://www.ikea.com/us/en/images/products/malm-4-drawer-chest-white__0858401_pe624314_s5.jpg?f=xxs",
    "17": "https://www.ikea.com/us/en/images/products/songesand-4-drawer-chest-white__0869111_pe658932_s5.jpg?f=xxs",
    "18": "https://www.ikea.com/us/en/images/products/bryggja-9-drawer-chest-beige__0778108_pe760067_s5.jpg?f=xxs",
    "19": "https://www.ikea.com/us/en/images/products/koppang-5-drawer-chest-white__0778087_pe758831_s5.jpg?f=xxs",
    "20": "https://www.ikea.com/us/en/images/products/nordmela-chest-of-drawers-with-clothes-rail-black-blue__0857791_pe711622_s5.jpg?f=xxs"
  },
  {
    "Room": " 'Desk'",
    "1": "https://www.ikea.com/us/en/images/products/micke-desk-white__0921905_pe787996_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/micke-desk-black-brown__0921903_pe787995_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/micke-corner-workstation-white__0921924_pe788003_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/micke-corner-workstation-black-brown__0921922_pe788004_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/alex-desk-black-brown__0824316_pe776058_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/alex-desk-gray-turquoise__1043712_ph177721_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/malm-desk-white__0662306_pe711832_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/malm-desk-black-brown__0662307_pe711831_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/malm-desk-brown-stained-ash-veneer__0657142_pe709629_s5.jpg?f=xl",
    "10": "https://www.ikea.com/us/en/images/products/hemnes-desk-white-stain__0973787_ph171478_s5.jpg?f=xs",
    "11": "https://www.ikea.com/us/en/images/products/hemnes-desk-dark-gray-stained__0850823_pe644942_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/alex-desk-black-brown__0824316_pe776058_s5.jpg?f=xs",
    "13": "https://www.ikea.com/us/en/images/products/hemnes-desk-with-2-drawers-white-stain__0661343_pe711435_s5.jpg?f=xs",
    "14": "https://www.ikea.com/us/en/images/products/vittsjoe-laptop-table-black-brown-glass__1048419_ph177891_s5.jpg?f=xs",
    "15": "https://www.ikea.com/us/en/images/products/arkelstorp-desk-black__0802362_ph162375_s5.jpg?f=xs",
    "16": "https://www.ikea.com/us/en/images/products/besta-burs-desk-high-gloss-white__0410754_pe269717_s5.jpg?f=xs",
    "17": "https://www.ikea.com/us/en/images/products/fjaellbo-laptop-table-black__0973715_ph153342_s5.jpg?f=xs",
    "18": "https://www.ikea.com/us/en/images/products/fredde-gaming-desk-black__0384132_ph123653_s5.jpg?f=m",
    "19": "https://www.ikea.com/us/en/images/products/lisabo-desk-ash-veneer__0793297_ph164901_s5.jpg?f=xs",
    "20": "https://www.ikea.com/us/en/images/products/brusali-corner-desk-brown__0921920_pe788000_s5.jpg?f=xs"
  },
  {
    "Room": " 'Computer Chair'",
    "1": "https://www.ikea.com/us/en/images/products/oerfjaell-childs-desk-chair-white-vissle-blue-green__0708523_pe726626_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/oerfjaell-childs-desk-chair-white-vissle-pink__0708525_pe726625_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/markus-office-chair-vissle-dark-gray__0399810_pe563882_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/flintan-office-chair-beige__1007198_pe825954_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/renberget-swivel-chair-bomstad-black__1020135_pe831794_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/mullfjaellet-conference-chair-with-casters-naggen-beige__0955958_pe804390_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/bleckberget-swivel-chair-idekulla-dark-gray__0814727_pe776015_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/bleckberget-swivel-chair-idekulla-beige__0814724_pe776010_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/hattefjaell-office-chair-gunnared-beige__0724691_pe734572_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/hattefjaell-office-chair-gunnared-light-brown-pink__0724702_pe734584_s5.jpg?f=xs",
    "11": "https://www.ikea.com/us/en/images/products/fjaellberget-conference-chair-with-casters-black-stained-ash-veneer-gunnared-dark-gray__0724704_pe734586_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/fjaellberget-conference-chair-with-casters-white-stained-oak-veneer-gunnared-beige__0848965_pe779198_s5.jpg?f=xs",
    "13": "https://www.ikea.com/us/en/images/products/nilserik-standing-support-black-vissle-dark-gray__0955866_pe804144_s5.jpg?f=xs",
    "14": "https://www.ikea.com/us/en/images/products/loberget-blyskaer-swivel-chair-with-pad-white-dark-gray__0806538_pe770239_s5.jpg?f=xs",
    "15": "https://www.ikea.com/us/en/images/products/bjoerkberget-swivel-chair-idekulla-blue__0959508_pe806048_s5.jpg?f=xs",
    "16": "https://www.ikea.com/us/en/images/products/bjoerkberget-swivel-chair-idekulla-dark-gray__0959511_pe806051_s5.jpg?f=xs",
    "17": "https://www.ikea.com/us/en/images/products/molte-desk-chair-gray__0327355_pe519797_s5.jpg?f=xs",
    "18": "https://www.ikea.com/us/en/images/products/hattefjaell-office-chair-smidig-black__0736000_pe740332_s5.jpg?f=xs",
    "19": "https://www.ikea.com/us/en/images/products/langfjaell-office-chair-with-armrests-gunnared-blue-white__0852664_pe671674_s5.jpg?f=xs",
    "20": "https://www.ikea.com/us/en/images/products/langfjaell-office-chair-with-armrests-gunnared-light-brown-pink-white__0852678_pe685712_s5.jpg?f=xs"
  },
  {
    "Room": " 'Wardrobe'",
    "1": "https://www.ikea.com/us/en/images/products/vuku-wardrobe-white__0498108_pe629461_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/brimnes-wardrobe-with-3-doors-white__0746976_pe744295_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/brimnes-wardrobe-with-3-doors-gray__0824300_pe776045_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/brimnes-wardrobe-with-3-doors-black__0428308_pe583470_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/brimnes-wardrobe-with-2-doors-white__0858440_pe679014_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/brimnes-wardrobe-with-2-doors-black__0796450_pe766371_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/brimnes-wardrobe-with-2-doors-gray__0818123_pe774307_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/rakkestad-wardrobe-with-3-doors-black-brown__0823988_pe776019_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/kleppstad-wardrobe-with-3-doors-white__0753595_pe748783_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/kleppstad-wardrobe-with-3-doors-white__0813670_ph165843_s5.jpg?f=xs",
    "11": "https://www.ikea.com/us/en/images/products/rakkestad-wardrobe-with-sliding-doors-black-brown__0823993_pe776024_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/rakkestad-wardrobe-with-2-doors-black-brown__0780372_pe760493_s5.jpg?f=xs",
    "13": "https://www.ikea.com/us/en/images/products/idanaes-wardrobe-dark-brown-stained__0931761_pe791238_s5.jpg?f=xs",
    "14": "https://www.ikea.com/us/en/images/products/idanaes-wardrobe-white__0931764_pe791241_s5.jpg?f=xs",
    "15": "https://www.ikea.com/us/en/images/products/sundvik-wardrobe-gray__0977368_pe813557_s5.jpg?f=xs",
    "16": "https://www.ikea.com/us/en/images/products/sundvik-wardrobe-white__0876034_pe613731_s5.jpg?f=xs",
    "17": "https://www.ikea.com/us/en/images/products/songesand-wardrobe-brown__0858553_pe660181_s5.jpg?f=xs",
    "18": "https://www.ikea.com/us/en/images/products/songesand-wardrobe-white__0818036_ph167731_s5.jpg?f=xs",
    "19": "https://www.ikea.com/us/en/images/products/visthus-wardrobe-gray-white__0858537_pe644340_s5.jpg?f=xs",
    "20": "https://www.ikea.com/us/en/images/products/idanaes-cabinet-with-bi-folding-doors-dark-brown-stained__0931741_pe791218_s5.jpg?f=xxs"
  },
  {
    "Room": " 'Cabinets'",
    "1": "https://www.ikea.com/us/en/images/products/knoxhult-wall-cabinet-with-door-gray__0630679_pe694840_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/knoxhult-base-cabinet-with-doors-and-drawer-white__0628161_ph137704_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/knoxhult-base-cabinet-with-doors-and-drawer-gray__0630752_pe694880_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/knoxhult-base-cabinet-with-doors-and-drawer-white__0630759_pe694887_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/sektion-wall-cabinet-with-2-doors-white-havstorp-turquoise__1008601_pe827225_s5.jpg?f=xl",
    "6": "https://www.ikea.com/us/en/images/products/sektion-wall-cabinet-with-2-doors-white-axstad-matte-blue__0961055_pe807291_s5.jpg?f=xl",
    "7": "https://www.ikea.com/us/en/images/products/knoxhult-base-cabinet-with-drawers-gray__0630753_pe694881_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/sektion-base-cabinet-for-sink-2-doors-white-askersund-dark-brown-ash-effect__0851105_pe779880_s5.jpg?f=xl",
    "9": "https://www.ikea.com/us/en/images/products/sektion-high-cabinet-pull-out-int-fittings-white-havstorp-turquoise__1008449_pe827026_s5.jpg?f=xl",
    "10": "https://www.ikea.com/us/en/images/products/sektion-high-cabinet-pull-out-int-fittings-white-lerhyttan-light-gray__0971417_pe811350_s5.jpg?f=xs",
    "11": "https://www.ikea.com/us/en/images/products/sektion-base-cabinet-with-3-drawers-white-maximera-voxtorp-dark-gray__0749812_pe746132_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/sektion-high-cabinet-with-shelves-2-doors-white-askersund-dark-brown-ash-effect__0850967_pe779740_s5.jpg?f=xl",
    "13": "https://www.ikea.com/us/en/images/products/tornviken-kitchen-island-off-white-oak__0736817_pe740760_s5.jpg?f=xs",
    "14": "https://www.ikea.com/us/en/images/products/knoxhult-base-cabinet-with-doors-and-drawer-gray__0628085_pe693587_s5.jpg?f=xs",
    "15": "https://www.ikea.com/us/en/images/products/knoxhult-wall-cabinet-with-door-gray__0630683_pe694844_s5.jpg?f=xs",
    "16": "https://www.ikea.com/us/en/images/products/sektion-maximera-base-cabinet-w-2-doors-2-drawers-white-bodarp-gray-green__0769943_pe755352_s5.jpg?f=xs",
    "17": "https://www.ikea.com/us/en/images/products/sektion-maximera-base-cabinet-w-2-doors-2-drawers-white-axstad-matte-blue__0960576_pe806929_s5.jpg?f=xs",
    "18": "https://www.ikea.com/us/en/images/products/sektion-high-cabinet-for-micro-w-4-doors-white-torhamn-ash__0920967_pe787501_s5.jpg?f=xl",
    "19": "https://www.ikea.com/us/en/images/products/sektion-high-cabinet-for-microwave-4doors-white-askersund-dark-brown-ash-effect__0920054_pe786831_s5.jpg?f=xl",
    "20": "https://www.ikea.com/us/en/images/products/sektion-maximera-wall-cab-w-2-glass-doors-2-drawers-white-bodbyn-dark-green__0762573_pe752082_s5.jpg?f=xs"
  },
  {
    "Room": " 'Pots & Pans'",
    "1": "https://www.ikea.com/us/en/images/products/annons-5-piece-cookware-set-glass-stainless-steel__0893765_pe609824_s5.jpg?f=xxs",
    "2": "https://www.ikea.com/us/en/images/products/fryser-6-piece-cookware-set-turquoise__0894016_pe713711_s5.jpg?f=xxs",
    "3": "https://www.ikea.com/us/en/images/products/hemlagad-6-piece-cookware-set-black__0789060_pe763801_s5.jpg?f=xxs",
    "4": "https://www.ikea.com/us/en/images/products/annons-pot-with-lid-glass-stainless-steel__0893917_pe609839_s5.jpg?f=xxs",
    "5": "https://www.ikea.com/us/en/images/products/ikea-365-cookware-set-of-6-stainless-steel__1015722_pe842407_s5.jpg?f=xxs",
    "6": "https://www.ikea.com/us/en/images/products/ikea-365-pot-with-lid-stainless-steel__1015741_pe842416_s5.jpg?f=xxs",
    "7": "https://www.ikea.com/us/en/images/products/hemlagad-pot-with-lid-black__0789060_pe763801_s5.jpg?f=xxs",
    "8": "https://www.ikea.com/us/en/images/products/sensuell-4-piece-cookware-set-stainless-steel-gray__0390729_pe559464_s5.jpg?f=xxs",
    "9": "https://www.ikea.com/us/en/images/products/oumbaerlig-frying-pan-copper-color__0708354_pe734983_s5.jpg?f=xxs",
    "10": "https://www.ikea.com/us/en/images/products/hemlagad-wok-with-lid-black__0789732_pe764110_s5.jpg?f=xxs",
    "11": "https://www.ikea.com/us/en/images/products/sensuell-saucepan-with-lid-stainless-steel-gray__0893193_pe559460_s5.jpg?f=xxs",
    "12": "https://www.ikea.com/us/en/images/products/vardagen-frying-pan-carbon-steel__0923181_pe788324_s5.jpg?f=xxs",
    "13": "https://www.ikea.com/us/en/images/products/ikea-365-frying-pan__0894187_pe622277_s5.jpg?f=xxs",
    "14": "https://www.ikea.com/us/en/images/products/vardagen-pot-with-lid-enamelled-steel__0893225_pe718916_s5.jpg?f=xxs",
    "15": "https://www.ikea.com/us/en/images/products/kavalkad-saucepan-set-of-3-black__0893724_pe609829_s5.jpg?f=xxs",
    "16": "https://www.ikea.com/us/en/images/products/ikea-365-5-piece-cookware-set__0893656_pe632038_s5.jpg?f=xxs",
    "17": "https://www.ikea.com/us/en/images/products/ikea-365-grill-pan__0894214_pe636502_s5.jpg?f=xxs",
    "18": "https://www.ikea.com/us/en/images/products/ikea-365-frying-pan-stainless-steel-non-stick-coating__1015733_pe842411_s5.jpg?f=xxs",
    "19": "https://www.ikea.com/us/en/images/products/ikea-365-frying-pan-stainless-steel-non-stick-coating__1060273_pe849960_s5.jpg?f=xxs",
    "20": "https://www.ikea.com/us/en/images/products/vardagen-saucepan-with-lid-enamelled-steel__0893700_pe718927_s5.jpg?f=xxs"
  },
  {
    "Room": " 'Dishes'",
    "1": "https://www.ikea.com/us/en/images/products/faergklar-24-piece-dinnerware-set-matte-green__1038365_pe839649_s5.jpg?f=xxs",
    "2": "https://www.ikea.com/us/en/images/products/faergklar-24-piece-dinnerware-set-matte-light-pink__0986005_pe816963_s5.jpg?f=xl",
    "3": "https://www.ikea.com/us/en/images/products/faergklar-24-piece-dinnerware-set-glossy-dark-turquoise__1038755_pe839867_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/faergklar-24-piece-dinnerware-set-glossy-dark-turquoise__1038679_pe839819_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/oftast-plate-white__0747026_pe744377_s5.jpg?f=xs",
    "6": "https://www.ikea.com/us/en/images/products/oftast-plate-white__0779352_ph161805_s5.jpg?f=xs",
    "7": "https://www.ikea.com/us/en/images/products/ertappad-dish-turquoise-brown__0990267_pe818840_s5.jpg?f=xxs",
    "8": "https://www.ikea.com/us/en/images/products/oftast-deep-plate-bowl-white__0979884_ph132227_s5.jpg?f=xs",
    "9": "https://www.ikea.com/us/en/images/products/ikea-365-serving-plate-white__0331052_pe523098_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/stilenlig-side-plate-leaf-patterned-white-green__0939935_pe794725_s5.jpg?f=xxs",
    "11": "https://www.ikea.com/us/en/images/products/vaerdera-deep-plate-bowl-white__0447079_pe194302_s5.jpg?f=xxs",
    "12": "https://www.ikea.com/us/en/images/products/ikea-365-18-piece-dinnerware-set-white__0624537_pe691886_s5.jpg?f=xxs",
    "13": "https://www.ikea.com/us/en/images/products/ikea-365-bowl-angled-sides-white__0331018_pe523143_s5.jpg?f=xxs",
    "14": "https://www.ikea.com/us/en/images/products/flitighet-bowl-white__0624558_pe691891_s5.jpg?f=xxs",
    "15": "https://www.ikea.com/us/en/images/products/faergklar-plate-glossy-beige__1010242_pe827988_s5.jpg?f=xxs",
    "16": "https://www.ikea.com/us/en/images/products/gladelig-plate-gray__0908617_pe783334_s5.jpg?f=xxs",
    "17": "https://www.ikea.com/us/en/images/products/hultet-dish-bamboo__0903308_pe584673_s5.jpg?f=xxs",
    "18": "https://www.ikea.com/us/en/images/products/vaerdera-plate-white__0186145_pe174842_s5.jpg?f=xxs",
    "19": "https://www.ikea.com/us/en/images/products/arv-broellop-cake-stand-with-lid-clear-glass__0280870_pe371522_s5.jpg?f=xxs",
    "20": "https://www.ikea.com/us/en/images/products/ikea-365-plate-with-compartments-white__0859506_pe780937_s5.jpg?f=xxs"
  },
  {
    "Room": " 'Appliances'",
    "1": "https://www.ikea.com/us/en/images/products/essentiell-built-in-dishwasher-black-stainless-steel__0857040_pe780880_s5.jpg?f=xxs",
    "2": "https://www.ikea.com/us/en/images/products/stjaernstatus-french-door-refrigerator-black-stainless-steel__0854663_pe780716_s5.jpg?f=xxs",
    "3": "https://www.ikea.com/us/en/images/products/vaelgrundad-bottom-freezer-refrigerator-stainless-steel__0956612_pe804793_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/adraett-wall-ov-w-true-conv-self-cleaning-stainless-steel__0852219_pe779996_s5.jpg?f=xxs",
    "5": "https://www.ikea.com/us/en/images/products/lagan-built-in-dishwasher-white__0857042_pe780882_s5.jpg?f=xxs",
    "6": "https://www.ikea.com/us/en/images/products/oeverskadlig-french-door-refrigerator-stainless-steel__0956638_pe804805_s5.jpg?f=xxs",
    "7": "https://www.ikea.com/us/en/images/products/motsvarig-range-with-glass-ceramic-cooktop-black-stainless-steel__0852454_pe780088_s5.jpg?f=xxs",
    "8": "https://www.ikea.com/us/en/images/products/medelniva-over-the-range-microwave-stainless-steel__0895627_pe782379_s5.jpg?f=xxs",
    "9": "https://www.ikea.com/us/en/images/products/saerklassig-induction-cooktop-black__0895667_pe783766_s5.jpg?f=xxs",
    "10": "https://www.ikea.com/us/en/images/products/konsistens-wall-oven-with-self-cleaning-stainless-steel__0895610_pe782366_s5.jpg?f=xxs",
    "11": "https://www.ikea.com/us/en/images/products/braennpunkt-gas-cooktop-stainless-steel__0895660_pe783759_s5.jpg?f=xxs",
    "12": "https://www.ikea.com/us/en/images/products/motsvarig-range-with-gas-cooktop-black-stainless-steel__0852455_pe780084_s5.jpg?f=xxs",
    "13": "https://www.ikea.com/us/en/images/products/tvaersaeker-range-with-induction-cooktop-stainless-steel__0895697_pe783789_s5.jpg?f=xxs",
    "14": "https://www.ikea.com/us/en/images/products/vinstgivande-wall-mounted-range-hood-stainless-steel__0781251_pe760610_s5.jpg?f=xxs",
    "15": "https://www.ikea.com/us/en/images/products/lagan-range-with-glass-ceramic-cooktop-white__0852452_pe780086_s5.jpg?f=xxs",
    "16": "https://www.ikea.com/us/en/images/products/spolad-built-in-dishwasher__0870196_pe687804_s5.jpg?f=xxs",
    "17": "https://www.ikea.com/us/en/images/products/undantag-wall-mounted-range-hood-stainless-steel-glass__0781246_pe760605_s5.jpg?f=xxs",
    "18": "https://www.ikea.com/us/en/images/products/lagan-under-cabinet-range-hood-white__0781237_pe760596_s5.jpg?f=xxs",
    "19": "https://www.ikea.com/us/en/images/products/allmaenbildad-wall-mounted-range-hood-stainless-steel__0781225_pe760584_s5.jpg?f=xxs",
    "20": "https://www.ikea.com/us/en/images/products/ungdomlig-wall-mounted-range-hood-black__0820710_pe775115_s5.jpg?f=xxs"
  },
  {
    "Room": " 'Dining Table'",
    "1": "https://www.ikea.com/us/en/images/products/moerbylanga-table-oak-veneer-brown-stained__0719765_pe732180_s5.jpg?f=xxs",
    "2": "https://www.ikea.com/us/en/images/products/skogsta-dining-table-acacia__0628543_ph149771_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/jokkmokk-table-and-4-chairs-antique-stain__0870916_pe716638_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/ekedalen-extendable-table-white__0870324_pe640623_s5.jpg?f=xxs",
    "5": "https://www.ikea.com/us/en/images/products/lerhamn-table-light-antique-stain-white-stain__0732519_pe738657_s5.jpg?f=xxs",
    "6": "https://www.ikea.com/us/en/images/products/lisabo-table-ash-veneer__0744785_pe743397_s5.jpg?f=xxs",
    "7": "https://www.ikea.com/us/en/images/products/ypperlig-table-ash__0871804_pe633922_s5.jpg?f=xxs",
    "8": "https://www.ikea.com/us/en/images/products/klimpfjaell-dining-table-gray-brown__0976438_pe813224_s5.jpg?f=xxs",
    "9": "https://www.ikea.com/us/en/images/products/ingatorp-extendable-table-black__0744779_pe743395_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/norden-gateleg-table-birch__0872350_pe716747_s5.jpg?f=xxs",
    "11": "https://www.ikea.com/us/en/images/products/bjursta-wall-mounted-drop-leaf-table-brown-black__0871184_pe614162_s5.jpg?f=xxs",
    "12": "https://www.ikea.com/us/en/images/products/ingatorp-extendable-table-black__1027294_pe834839_s5.jpg?f=xxs",
    "13": "https://www.ikea.com/us/en/images/products/mariedamm-table-black-marble-effect__0933647_pe792161_s5.jpg?f=xxs",
    "14": "https://www.ikea.com/us/en/images/products/ikea-ps-2012-drop-leaf-table-bamboo-white__0737119_pe740892_s5.jpg?f=xs",
    "15": "https://www.ikea.com/us/en/images/products/gamlared-table-light-antique-stain-black-stained__0870436_pe672126_s5.jpg?f=xxs",
    "16": "https://www.ikea.com/us/en/images/products/nordviken-extendable-table-black__1030736_pe836340_s5.jpg?f=xxs",
    "17": "https://www.ikea.com/us/en/images/products/tranebo-dining-table-black__0939083_pe794391_s5.jpg?f=xxs",
    "18": "https://www.ikea.com/us/en/images/products/vedbo-dining-table-black__0815091_pe772752_s5.jpg?f=xxs",
    "19": "https://www.ikea.com/us/en/images/products/nordviken-drop-leaf-table-white__1028695_pe835488_s5.jpg?f=xxs",
    "20": "https://www.ikea.com/us/en/images/products/aepplaroe-drop-leaf-table-outdoor-brown-stained__0667537_pe713947_s5.jpg?f=xxs"
  },
  {
    "Room": "Dining Chair'",
    "1": "https://www.ikea.com/us/en/images/products/odger-chair-anthracite__0739669_pe741828_s5.jpg?f=xs",
    "2": "https://www.ikea.com/us/en/images/products/odger-chair-green__0817921_pe774174_s5.jpg?f=xs",
    "3": "https://www.ikea.com/us/en/images/products/ingolf-chair-brown-black__0872556_pe595406_s5.jpg?f=xs",
    "4": "https://www.ikea.com/us/en/images/products/lerhamn-chair-light-antique-stain-vittaryd-beige__0728161_pe736119_s5.jpg?f=xs",
    "5": "https://www.ikea.com/us/en/images/products/harry-chair-black-knisa-light-gray__0733247_pe738895_s5.jpg?f=xxs",
    "6": "https://www.ikea.com/us/en/images/products/omtaenksam-chair-light-gray__0913377_pe783476_s5.jpg?f=xxs",
    "7": "https://www.ikea.com/us/en/images/products/roenninge-chair-green__0642105_pe700897_s5.jpg?f=xs",
    "8": "https://www.ikea.com/us/en/images/products/ekedalen-chair-dark-brown-orrsta-light-gray__0870235_pe717452_s5.jpg?f=xxs",
    "9": "https://www.ikea.com/us/en/images/products/nordviken-chair-black__0714202_pe729964_s5.jpg?f=xs",
    "10": "https://www.ikea.com/us/en/images/products/karljan-chair-turquoise-kabusa-turquoise__0926962_pe789603_s5.jpg?f=xxs",
    "11": "https://www.ikea.com/us/en/images/products/lisabo-chair-ash__0786549_pe763015_s5.jpg?f=xs",
    "12": "https://www.ikea.com/us/en/images/products/tobias-chair-blue-chrome-plated__0872956_pe620039_s5.jpg?f=xs",
    "13": "https://www.ikea.com/us/en/images/products/norraryd-chair-black__0727327_pe735599_s5.jpg?f=xs",
    "14": "https://www.ikea.com/us/en/images/products/ingolf-chair-white-hallarp-beige__0926877_pe789566_s5.jpg?f=xs",
    "15": "https://www.ikea.com/us/en/images/products/hansolle-chair-black-brown__0987282_pe817497_s5.jpg?f=xs",
    "16": "https://www.ikea.com/us/en/images/products/volfgang-chair-chrome-plated-gunnared-medium-gray__0870070_pe672672_s5.jpg?f=xxs",
    "17": "https://www.ikea.com/us/en/images/products/yngvar-chair-anthracite__0750850_pe746841_s5.jpg?f=xxs",
    "18": "https://www.ikea.com/us/en/images/products/ekedalen-chair-white-orrsta-light-gray__0871305_pe717450_s5.jpg?f=xxs",
    "19": "https://www.ikea.com/us/en/images/products/gruvbyn-chair-brown-nordvalla-dark-gray__0871426_pe718340_s5.jpg?f=xxs",
    "20": "https://www.ikea.com/us/en/images/products/bernhard-chair-chrome-plated-mjuk-dark-brown__0872309_pe595370_s5.jpg?f=xxs"
  }
 ]



/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating fake data for everyone
  const users = await Promise.all([
    User.create({ username: 'amata', password: '123' }),
    User.create({ username: 'jamie', password: '123' }),
    User.create({ username: 'patricia', password: '123' }),
    User.create({ username: 'stanie', password: '123' }),
    User.create({ username: 'hello', password: '123' }),
    User.create({ username: 'bingo', password: '123' }),
  ]);

  const admins = await Promise.all([
    Admin.create({ firstName: 'amata', lastName:'lee', password: '123' }),
    Admin.create({ firstName: 'jamie', lastName:'ha', password: '123' }),
  ]);

  const carts = await Promise.all([
    Cart.create({productName: 'ikea kitchen table', productQty: 9, cartTotal: 23.43, productTotal: 20 }),
    Cart.create({productName: 'ikea kitchen chair', productQty: 2, cartTotal: 50, productTotal: 2 }),
    Cart.create({productName: 'ikea bathroom table', productQty: 4, cartTotal: 12.32, productTotal: 19 }),
    Cart.create({productName: 'ikea bathroom chair', productQty: 1, cartTotal: 6.43, productTotal: 5 }),
    Cart.create({productName: 'ikea kitchen table', productQty: 6, cartTotal: 2, productTotal: 1 }),
  ]);

  const customers = await Promise.all([
    Customer.create({ firstName: 'Pat', lastName: 'Aguiar', address:'Brooklyn woohoo', username:'23df' }),
    Customer.create({ firstName: 'Stannie', lastName: 'Lim', address:'Staten Island', username:'23dafdf' }),
    Customer.create({ firstName: 'Hello', lastName: 'Goodbye', address:'s120395 aodifj drive', username:'jdfoijs' }),
    Customer.create({ firstName: 'Bingo', lastName: 'Dog', address:'14 Faith Drive', username:'asldgfjwe09' }),
  ]);

  const invoices = await Promise.all([
    Invoice.create({productName: 'ikea kitchen table', productQty: 9, invoiceTotal: 23.43, productTotal: 20 }),
    Invoice.create({productName: 'ikea kitchen chair', productQty: 2, invoiceTotal: 50, productTotal: 2 }),
    Invoice.create({productName: 'ikea bathroom table', productQty: 4, invoiceTotal: 12.32, productTotal: 19 }),
    Invoice.create({productName: 'ikea bathroom chair', productQty: 1, invoiceTotal: 6.43, productTotal: 5 }),
    Invoice.create({productName: 'ikea kitchen table', productQty: 6, invoiceTotal: 2, productTotal: 1 }),
  ]);

  const [livingRoom, bedRoom, kitchen, diningRoom] = await Promise.all(
    roomTypes.map(room =>{
      return(
        Room.create({ name: room })
      )
    }),
  );

  const [Couch, CoffeeTable, EndTable, TVStand, LoveSeat, Rug, Lamp, Shelf,Bed, NightStand, Dresser, Desk, ComputerChair, Wardrobe, Cabinets, PotsPans, Dishes, Appliances, DiningTable, DiningChair] = await Promise.all(
    productTypesArr.map(type =>{
      return(
        ProductType.create({ name: type })
      )
    })
  );




  const products = await Promise.all(
    productArr.map(num =>{
      const product = productTypesArr[num];
      const name = (faker.lorem.word() + " " + product).toUpperCase()
      
      //Assigns Room IDs
      let room = ''
      if(livingRoomTypes.includes(product)){
         room = livingRoom.id
      }
      if(bedRoomTypes.includes(product)){
        room = bedRoom.id
      }
     if(kitchenTypes.includes(product)){
      room = kitchen.id
      }
     if(diningRoomTypes.includes(product)){
      room = diningRoom.id
      }

      //Assigns product types
      let category = '';
      if(product === 'Couch'){
        category = Couch.id
      }
      else if(product === 'Coffee Table'){
        category = CoffeeTable.id
      }
      else if(product === 'End Table'){
        category = EndTable.id
      }
      else if(product === 'TV Stand'){
        category = TVStand.id
      }
      else if(product === 'Love Seat'){
        category = LoveSeat.id
      }
      else if(product === 'Rug'){
        category = Rug.id
      }
      else if(product === 'Lamp'){
        category = Lamp.id
      }
      else if(product === 'Shelf'){
        category = Shelf.id
      }
      else if (product === 'Bed'){
        category = Bed.id
      }
      else if (product === 'Night Stand'){
        category = NightStand.id
      }
      else if(product === 'Dresser'){
        category = Dresser.id
      }
      else if(product === 'Desk'){
        category = Desk.id
      }
      else if(product === 'Computer Chair'){
        category = ComputerChair.id
      }
      else if(product === 'Wardrobe'){
        category = Wardrobe.id
      }
      else if(product === 'Cabinets'){
        category = Cabinets.id
      }
      else if(product === 'Pots & Pans'){
        category = PotsPans.id
      }
      else if(product === 'Dishes'){
        category = Dishes.id
      }
      else if(product === 'Appliances'){
        category = Appliances.id
      }
      else if(product === 'Dining Table'){
        category = DiningTable.id
      }
      else if (product === 'Dining Chair'){
        category = DiningChair.id
      }

      return(
        Product.create({name: name , description: faker.lorem.paragraph(), quantity: Math.round(Math.random()*50), cost: faker.commerce.price(), imageUrl: productImgs[num][(Math.round( Math.random() * 19 ) + 1).toString() ] , roomId: room, productTypeId: category })
      )
    })
  );



  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${admins.length} admins`);
  console.log(`seeded ${carts.length} carts`);
  console.log(`seeded ${customers.length} customers`);
  console.log(`seeded ${invoices.length} invoices`);
  console.log(`seeded ${products.length} products`);
  //console.log(`seeded ${productTypes.length} productTypes`);
  //console.log(`seeded ${rooms.length} rooms`);

  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }


};

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
