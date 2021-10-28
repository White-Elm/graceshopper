const productImgs = [
    {
      "Room": "Couch'",
      "1": "https://www.ikea.com/global/assets/navigation/images/leather-coated-fabric-sofas-with-chaise-longues-47391.jpeg?imwidth=400",
      "2": "https://www.ikea.com/global/assets/navigation/images/leather-coated-fabric-three-seat-sofas-35191.jpeg?imwidth=400",
      "3": "https://www.ikea.com/global/assets/navigation/images/leather-coated-fabric-two-seat-sofas-10690.jpeg?imwidth=400",
      "4": "https://www.ikea.com/global/assets/navigation/images/sofa-modules-31786.jpeg?imwidth=500",
      "5": "https://www.ikea.com/images/soederhamn-series-a92f2490dd85aca85927eff430c2dd24.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/soederhamn-sofa-with-open-end-samsta-dark-gray__0666138_pe713421_s5.jpg?f=xxs"
    },
    {
      "Room": " 'Coffee Table'",
      "1": "https://www.ikea.com/us/en/images/products/lack-coffee-table-black-brown__0835835_pe601383_s5.jpg?f=xxxs",
      "2": "https://www.ikea.com/us/en/images/products/lunnarp-coffee-table-brown__0836846_pe675311_s5.jpg?f=xxxs",
      "3": "https://www.ikea.com/us/en/images/products/vittsjoe-coffee-table-black-brown-glass__0836655_pe601386_s5.jpg?f=xxxs",
      "4": "https://www.ikea.com/us/en/images/products/vittsjoe-nesting-tables-set-of-2-black-brown-glass__0836370_pe601384_s5.jpg?f=xxxs",
      "5": "https://www.ikea.com/us/en/images/products/stockholm-coffee-table-walnut-veneer__0836022_pe601366_s5.jpg?f=xxxs",
      "6": "https://www.ikea.com/us/en/images/products/fjaellbo-coffee-table-black__0835968_pe616234_s5.jpg?f=xxxs"
    },
    {
      "Room": " 'End Table'",
      "1": "https://www.ikea.com/us/en/images/products/lack-side-table-black__0836736_pe601411_s5.jpg?f=xxxs",
      "2": "https://www.ikea.com/us/en/images/products/gladom-tray-table-white__0836821_pe709866_s5.jpg?f=xxxs",
      "3": "https://www.ikea.com/us/en/images/products/knarrevik-nightstand-light-gray-blue__1010425_pe828062_s5.jpg?f=xxxs",
      "4": "https://www.ikea.com/us/en/images/products/hemnes-nightstand-black-brown__0858447_pe670723_s5.jpg?f=xxxs",
      "5": "https://www.ikea.com/us/en/images/products/listerby-side-table-brown__0836854_pe693244_s5.jpg?f=xxxs",
      "6": "https://www.ikea.com/us/en/images/products/fjaellbo-side-table-with-storage-black__0996614_pe822413_s5.jpg?f=xxxs"
    },
    {
      "Room": " 'TV Stand'",
      "1": "https://www.ikea.com/us/en/images/products/hemnes-tv-unit-black-brown__0679553_pe719634_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/us/en/images/products/brimnes-tv-unit-black__0851278_pe725293_s5.jpg?f=xxxs",
      "3": "https://www.ikea.com/us/en/images/products/lommarp-tv-unit-black__1019793_pe831571_s5.jpg?f=xxxs",
      "4": "https://www.ikea.com/us/en/images/products/lack-tv-unit-black-brown__0955265_pe803705_s5.jpg?f=xxxs",
      "5": "https://www.ikea.com/us/en/images/products/fjaellbo-tv-unit-black__0850235_pe616397_s5.jpg?f=xxxs",
      "6": "https://www.ikea.com/us/en/images/products/besta-tv-unit-with-drawers-lappviken-sindvik-black-brown-clear-glass__0351969_pe538019_s5.jpg?f=l"
    },
    {
      "Room": " 'Love Seat'",
      "1": "https://www.ikea.com/us/en/images/products/klippan-loveseat-bomstad-black__0827136_pe709127_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/us/en/images/products/uppland-loveseat-hallarp-gray__0818536_pe774467_s5.jpg?f=xxs",
      "3": "https://www.ikea.com/us/en/images/products/kivik-loveseat-hillared-dark-blue__0788727_pe763708_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/kivik-loveseat-grann-bomstad-black__0788723_pe763699_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/vallentuna-modular-loveseat-with-storage-hillared-beige__0938387_pe794098_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/finnala-loveseat-grann-bomstad-black__0817360_pe773991_s5.jpg?f=xxxs"
    },
    {
      "Room": " 'Rug'",
      "1": "https://www.ikea.com/us/en/images/products/langsted-rug-low-pile-yellow__0661980_pe711674_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/us/en/images/products/stoense-rug-low-pile-medium-gray__0624383_pe691798_s5.jpg?f=xxs",
      "3": "https://www.ikea.com/us/en/images/products/stangerum-rug-high-pile-gray__0830986_pe776962_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/halved-rug-flatwoven-handmade-multicolor__0891770_pe613752_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/soenderoed-rug-high-pile-blue__0891818_pe620925_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/rens-sheepskin-white__0893182_pe560504_s5.jpg?f=xxs"
    },
    {
      "Room": " 'Lamp'",
      "1": "https://www.ikea.com/us/en/images/products/tagarp-floor-uplighter-with-light-bulb-black-white__0810839_pe771437_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/us/en/images/products/lauters-floor-lamp-with-led-bulb-ash-white__0879908_pe714870_s5.jpg?f=xxs",
      "3": "https://www.ikea.com/us/en/images/products/tagarp-floor-uplt-read-lamp-w-light-bulb-black-white__0967772_pe810276_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/barlast-floor-lamp-with-led-bulb-black-white__0957677_pe805131_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/solbo-table-lamp-white-owl__0883240_pe645478_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/taernaby-table-lamp-with-led-bulb-anthracite__0760736_ph160475_s5.jpg?f=xxs"
    },
    {
      "Room": " 'Shelf'",
      "1": "https://www.ikea.com/images/make-a-calm-and-practical-bathroom-wall-display-2f3fac6c3764becb48f05bcc302319c4.jpg?f=l",
      "2": "https://www.ikea.com/us/en/images/products/mosslanda-picture-ledge-black__0905701_pe556435_s5.jpg?f=xxs",
      "3": "https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__0400099_pe564091_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/images/kallax-regale-in-verschiedenen-farben-in-weiss-und-schwarz-u-ad4707b7fdae48fe042ff02ed612ff5f.jpg?f=l",
      "5": "https://www.ikea.com/us/en/images/products/lack-wall-shelf-unit-white__0676618_pe718730_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/kallax-shelf-unit-white__0400115_pe564107_s5.jpg?f=xxs"
    },
    {
      "Room": "'Bed'",
      "1": "https://www.ikea.com/pimg/0861987_pe681422_s5.jpg?f=xxxl",
      "2": "https://www.ikea.com/pimg/1063809_ph182861_s5.jpg?f=xs",
      "3": "https://www.ikea.com/pimg/0860907_pe658191_s5.jpg?f=xs",
      "4": "https://www.ikea.com/pimg/0859809_pe664785_s5.jpg?f=xs",
      "5": "https://www.ikea.com/pimg/0859687_pe781078_s5.jpg?f=xs",
      "6": "https://www.ikea.com/us/en/images/products/idanaes-upholstered-bed-frame-gunnared-dark-gray__0971544_pe811389_s5.jpg?f=xxs"
    },
    {
      "Room": " 'Night Stand'",
      "1": "https://www.ikea.com/us/en/images/products/malm-2-drawer-chest-white-stained-oak-veneer__0379924_pe554966_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/us/en/images/products/brimnes-nightstand-black__0439568_pe592286_s5.jpg?f=xxs",
      "3": "https://www.ikea.com/us/en/images/products/knarrevik-nightstand-black__0858302_pe669481_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/hemnes-nightstand-black-brown__0858447_pe670723_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/idanaes-nightstand-dark-brown-stained__0931773_pe791242_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/hemnes-3-drawer-chest-white-stain__1045638_pe842683_s5.jpg?f=xxs"
    },
    {
      "Room": " 'Dresser'",
      "1": "https://www.ikea.com/us/en/images/products/koppang-6-drawer-dresser-white__0778092_pe758833_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/us/en/images/products/hemnes-8-drawer-dresser-dark-gray-stained__0519832_pe641792_s5.jpg?f=xxs",
      "3": "https://www.ikea.com/us/en/images/products/malm-6-drawer-dresser-white__0859014_pe624334_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/kullen-6-drawer-dresser-black-brown__0778046_pe758818_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/hemnes-6-drawer-chest-dark-gray-stained__0857536_pe644432_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/songesand-6-drawer-chest-brown__0859150_pe658939_s5.jpg?f=xxs"
    },
    {
      "Room": " 'Desk'",
      "1": "https://www.ikea.com/us/en/images/products/micke-desk-white__0921905_pe787996_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/images/small-home-office-with-a-linnmon-krille-table-in-white-with--e3d10fc1f195ee720f729915de07ae94.jpg?f=l",
      "3": "https://www.ikea.com/us/en/images/products/micke-corner-workstation-white__0921924_pe788003_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/alex-desk-black-brown__0824316_pe776058_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/alex-desk-black-brown__0824316_pe776058_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/lillasen-desk-bamboo__0985618_ph161689_s5.jpg?f=xxs"
    },
    {
      "Room": " 'Chair'",
      "1": "https://www.ikea.com/us/en/images/products/oerfjaell-childs-desk-chair-white-vissle-pink__0716731_pe731032_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/images/d6/9f/d69f16ac550b2c5f097d269a7ee71486.jpg?f=l",
      "3": "https://www.ikea.com/us/en/images/products/markus-office-chair-vissle-dark-gray__0399810_pe563882_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/langfjaell-office-chair-gunnared-blue-white__0657180_pe709650_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/jaervfjaellet-office-chair-gunnared-blue__0854116_pe683116_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/hattefjaell-office-chair-gunnared-light-brown-pink__0854065_pe671033_s5.jpg?f=xxs"
    },
    {
      "Room": " 'Wardrobe'",
      "1": "https://www.ikea.com/us/en/images/products/rakkestad-wardrobe-with-3-doors-black-brown__0823988_pe776019_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/us/en/images/products/vuku-wardrobe-white__0498108_pe629461_s5.jpg?f=xxs",
      "3": "https://www.ikea.com/us/en/images/products/brimnes-wardrobe-with-3-doors-white__0746976_pe744295_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/brimnes-wardrobe-with-2-doors-white__0746968_pe744294_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/songesand-wardrobe-brown__0858553_pe660181_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/godishus-wardrobe-white__0721179_pe735621_s5.jpg?f=xxs"
    },
    {
      "Room": " 'Cabinets'",
      "1": "https://www.ikea.com/us/en/images/products/sektion-maximera-base-cabinet-with-3-drawers-white-havstorp-turquoise__1008374_pe826915_s5.jpg?f=xxxs",
      "2": "https://www.ikea.com/us/en/images/products/sektion-base-cabinet-with-shelves-2-doors-white-havstorp-turquoise__1008337_pe826897_s5.jpg?f=xxxs",
      "3": "https://www.ikea.com/us/en/images/products/sektion-base-cabinet-with-shelves-2-doors-white-sinarp-brown__0953293_pe802596_s5.jpg?f=l",
      "4": "https://www.ikea.com/us/en/images/products/sektion-high-cabinet-pull-out-int-fittings-white-kungsbacka-anthracite__0971415_pe811349_s5.jpg?f=l",
      "5": "https://www.ikea.com/us/en/images/products/sektion-wall-cabinet-white-bodbyn-dark-green__0762532_pe752107_s5.jpg?f=l",
      "6": "https://www.ikea.com/us/en/images/products/knoxhult-wall-cabinet-with-door-gray__0630683_pe694844_s5.jpg?f=xxxs"
    },
    {
      "Room": " 'Pots & Pans'",
      "1": "https://www.ikea.com/us/en/images/products/annons-5-piece-cookware-set-glass-stainless-steel__0893765_pe609824_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/us/en/images/products/fryser-6-piece-cookware-set-turquoise__0894016_pe713711_s5.jpg?f=xxs",
      "3": "https://www.ikea.com/us/en/images/products/ikea-365-cookware-set-of-6-stainless-steel__1015722_pe842407_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/sensuell-4-piece-cookware-set-stainless-steel-gray__0390729_pe559464_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/vardagen-frying-pan-carbon-steel__0923187_pe788330_s5.jpg?f=l",
      "6": "https://www.ikea.com/us/en/images/products/vardagen-saucepan-with-lid-enamelled-steel__0893700_pe718927_s5.jpg?f=xxs"
    },
    {
      "Room": " 'Dishes'",
      "1": "https://www.ikea.com/us/en/images/products/faergklar-24-piece-dinnerware-set-matte-green__1038365_pe839649_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/us/en/images/products/ikea-365-18-piece-dinnerware-set-white__0624537_pe691886_s5.jpg?f=xxs",
      "3": "https://www.ikea.com/us/en/images/products/favorisera-12-piece-dinnerware-set-white__0939887_pe794708_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/oftast-plate-white__0747026_pe744377_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/vaerdera-18-piece-dinnerware-set-white__0447091_pe224003_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/ikea-365-bowl-angled-sides-white__0331018_pe523143_s5.jpg?f=xxs"
    },
    {
      "Room": " 'Appliances'",
      "1": "https://www.ikea.com/us/en/images/products/essentiell-built-in-dishwasher-black-stainless-steel__0857040_pe780880_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/us/en/images/products/stjaernstatus-french-door-refrigerator-black-stainless-steel__0854663_pe780716_s5.jpg?f=xxs",
      "3": "https://www.ikea.com/us/en/images/products/adraett-wall-ov-w-true-conv-self-cleaning-stainless-steel__0852219_pe779996_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/motsvarig-range-with-glass-ceramic-cooktop-black-stainless-steel__0852454_pe780088_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/medelniva-over-the-range-microwave-stainless-steel__0895627_pe782379_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/braennpunkt-gas-cooktop-stainless-steel__0895660_pe783759_s5.jpg?f=xxs"
    },
    {
      "Room": " 'Dining Table'",
      "1": "https://www.ikea.com/us/en/images/products/moerbylanga-table-oak-veneer-brown-stained__0719765_pe732180_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/us/en/images/products/lerhamn-table-light-antique-stain-white-stain__0732519_pe738657_s5.jpg?f=xxs",
      "3": "https://www.ikea.com/us/en/images/products/lisabo-table-ash-veneer__0744785_pe743397_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/ekedalen-extendable-table-white__0870324_pe640623_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/ypperlig-table-ash__0871804_pe633922_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/klimpfjaell-dining-table-gray-brown__0976438_pe813224_s5.jpg?f=xxs"
    },
    {
      "Room": "Dining Chair'",
      "1": "https://www.ikea.com/us/en/images/products/ingolf-chair-brown-black__0872556_pe595406_s5.jpg?f=xxs",
      "2": "https://www.ikea.com/us/en/images/products/harry-chair-black-knisa-light-gray__0733247_pe738895_s5.jpg?f=xxs",
      "3": "https://www.ikea.com/us/en/images/products/omtaenksam-chair-light-gray__0913377_pe783476_s5.jpg?f=xxs",
      "4": "https://www.ikea.com/us/en/images/products/ekedalen-chair-dark-brown-orrsta-light-gray__0870235_pe717452_s5.jpg?f=xxs",
      "5": "https://www.ikea.com/us/en/images/products/stefan-chair-brown-black__0870436_pe672126_s5.jpg?f=xxs",
      "6": "https://www.ikea.com/us/en/images/products/norraryd-chair-black__1031947_ph170167_s5.jpg?f=xxs"
    }
   ]

