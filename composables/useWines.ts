import type { UserWine, UserWineData } from "../types/schema";
import { WineType, CountryCode, BottleSize } from "../types/schema";

// Mock wine data for the test
const mockWines: UserWine[] = [
  {
    id: "1",
    externalId: "EXT001",
    size: BottleSize.Bottle,
    vintage: 2018,
    price: 4500,
    takeAwayPrice: 4200,
    fallbackPurchasePrice: 3800,
    data: {
      wineId: "wine1",
      type: WineType.Red,
      name: "Barolo Riserva",
      winery: "Giacomo Conterno",
      territory: "Piemonte",
      country: CountryCode.It,
    },
    minRequiredStock: 10,
    currentStock: 25,
    currentStockValue: 112500,
    info: "Excellent vintage, perfect for aging",
    internalNotes: "Store in temperature controlled environment",
    storageArea: "Cellar A",
    visible: true,
  },
  {
    id: "2",
    externalId: "EXT002",
    size: BottleSize.Magnum,
    vintage: 2019,
    price: 3200,
    takeAwayPrice: 3000,
    fallbackPurchasePrice: 2800,
    data: {
      wineId: "wine2",
      type: WineType.White,
      name: "Chablis Grand Cru",
      winery: "Domaine Raveneau",
      territory: "Burgundy",
      country: CountryCode.Fr,
    },
    minRequiredStock: 5,
    currentStock: 8,
    currentStockValue: 25600,
    info: "Limited availability",
    internalNotes: "Keep away from light",
    storageArea: "Cellar B",
    visible: true,
  },
  {
    id: "3",
    externalId: "EXT003",
    size: BottleSize.Bottle,
    vintage: 2020,
    price: 1800,
    takeAwayPrice: 1700,
    fallbackPurchasePrice: 1600,
    data: {
      wineId: "wine3",
      type: WineType.Rose,
      name: "Provence Rosé",
      winery: "Château d'Esclans",
      territory: "Provence",
      country: CountryCode.Fr,
    },
    minRequiredStock: 15,
    currentStock: 0,
    currentStockValue: 0,
    info: "Out of stock",
    internalNotes: "Reorder needed",
    storageArea: "Cellar C",
    visible: false,
  },
  {
    id: "4",
    externalId: "EXT004",
    size: BottleSize.Bottle,
    vintage: 2017,
    price: 2800,
    takeAwayPrice: 2600,
    fallbackPurchasePrice: 2400,
    data: {
      wineId: "wine4",
      type: WineType.Red,
      name: "Brunello di Montalcino",
      winery: "Biondi Santi",
      territory: "Tuscany",
      country: CountryCode.It,
    },
    minRequiredStock: 8,
    currentStock: 12,
    currentStockValue: 33600,
    info: "Classic vintage",
    internalNotes: "Archive after 2025",
    storageArea: "Cellar A",
    visible: false,
  },
  {
    id: "5",
    externalId: "EXT005",
    size: BottleSize.Bottle,
    vintage: 2021,
    price: 1200,
    takeAwayPrice: 1100,
    fallbackPurchasePrice: 1000,
    data: {
      wineId: "wine5",
      type: WineType.Sparkling,
      name: "Champagne Brut",
      winery: "Moët & Chandon",
      territory: "Champagne",
      country: CountryCode.Fr,
    },
    minRequiredStock: 20,
    currentStock: 35,
    currentStockValue: 42000,
    info: "Best seller",
    internalNotes: "Keep in front display",
    storageArea: "Cellar B",
    visible: true,
  },
  {
    id: "6",
    externalId: "EXT006",
    size: BottleSize.Bottle,
    vintage: 2016,
    price: 6500,
    takeAwayPrice: 6200,
    fallbackPurchasePrice: 6000,
    data: {
      wineId: "wine6",
      type: WineType.Red,
      name: "Amarone della Valpolicella",
      winery: "Giuseppe Quintarelli",
      territory: "Veneto",
      country: CountryCode.It,
    },
    minRequiredStock: 3,
    currentStock: 2,
    currentStockValue: 13000,
    info: "Rare vintage",
    internalNotes: "Archive - limited space",
    storageArea: "Archive",
    visible: false,
  },
];

export const useWines = () => {
  // Get wines with pagination
  const getWines = async (page: number = 1, limit: number = 10) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const start = (page - 1) * limit;
    const end = start + limit;

    return mockWines.slice(start, end) as UserWine[];
  };

  // Format price in euros
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  // Format bottle size
  const formatBottleSize = (size: BottleSize) => {
    const sizeMap: Record<BottleSize, string> = {
      [BottleSize.Bottle]: "0.75L",
      [BottleSize.Magnum]: "1.5L",
      [BottleSize.Jeroboam]: "3L",
      [BottleSize.Imperial]: "6L",
      [BottleSize.Salmanazar]: "9L",
      [BottleSize.Balthazar]: "12L",
      [BottleSize.Nebuchadnezzar]: "15L",
      [BottleSize.Melchior]: "18L",
      [BottleSize.Solomon]: "20L",
      [BottleSize.Sovereign]: "26.25L",
      [BottleSize.Melchizedek]: "30L",
      [BottleSize.HalfBottle]: "0.375L",
      [BottleSize.HalfLiter]: "0.5L",
      [BottleSize.Liter]: "1L",
      [BottleSize.Quart_1]: "0.25L",
      [BottleSize.Quart_2]: "0.25L",
      [BottleSize.Huitieme]: "0.094L",
      [BottleSize.Mathusalem]: "6L",
      [BottleSize.Rehoboam]: "4.5L",
      [BottleSize.Goliath]: "27L",
      [BottleSize.BordeauxJeroboam]: "3L",
    };
    return sizeMap[size] || size;
  };

  return {
    getWines,
    formatPrice,
    formatBottleSize,
  };
};
