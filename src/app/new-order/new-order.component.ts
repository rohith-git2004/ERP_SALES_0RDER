import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  OrderItem,
  OrderStoreService,
  SalesOrder
} from '../order-store.service';

interface CatalogueProduct extends OrderItem {
  category: string;
}

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css'
})
export class NewOrderComponent implements OnInit {

  routePlans = [
    'Dubai',
    'Abu Dhabi',
    'Saudi',
    'India',
    'Qatar'
  ];

  voucherTypes = [
    'Voucher Receipt'
  ];

  /* =========================================
     PRODUCT CATALOGUE
     ========================================= */

  productCatalogue: CatalogueProduct[] = [

    {
      name: 'PVC Trunking 16 x 16',
      code: 'PVC1616',
      category: 'PVC Trunking',
      size: '16 × 16 mm',
      available: 148,
      spRate: 4,
      qty: 1,
      orderRate: 4
    },
    {
      name: 'Pants',
      code: 'PNT1001',
      category: 'Pants',
      size: 'Standard',
      available: 80,
      spRate: 35,
      qty: 1,
      orderRate: 35
    },
    {
      name: 'Shirt',
      code: 'SHT1002',
      category: 'Shirt',
      size: 'M',
      available: 65,
      spRate: 28,
      qty: 1,
      orderRate: 28
    },
    {
      name: 'T-Shirt',
      code: 'TSH1003',
      category: 'T-Shirt',
      size: 'L',
      available: 90,
      spRate: 22,
      qty: 1,
      orderRate: 22
    },
    {
      name: 'Shoes',
      code: 'SHO1004',
      category: 'Shoes',
      size: '42',
      available: 42,
      spRate: 55,
      qty: 1,
      orderRate: 55
    },

    {
      name: 'PVC Trunking 20 x 20',
      code: 'PVC2020',
      category: 'PVC Trunking',
      size: '20 × 20 mm',
      available: 120,
      spRate: 5.5,
      qty: 1,
      orderRate: 5.5
    },
    {
      name: 'PVC Trunking 25 x 25',
      code: 'PVC2525',
      category: 'PVC Trunking',
      size: '25 × 25 mm',
      available: 110,
      spRate: 7,
      qty: 1,
      orderRate: 7
    },
    {
      name: 'PVC Trunking 40 x 40',
      code: 'PVC4040',
      category: 'PVC Trunking',
      size: '40 × 40 mm',
      available: 90,
      spRate: 12,
      qty: 1,
      orderRate: 12
    },
    {
      name: 'PVC Trunking 50 x 50',
      code: 'PVC5050',
      category: 'PVC Trunking',
      size: '50 × 50 mm',
      available: 75,
      spRate: 16,
      qty: 1,
      orderRate: 16
    },

    {
      name: 'Formal Pants',
      code: 'PNT1002',
      category: 'Pants',
      size: '32',
      available: 60,
      spRate: 45,
      qty: 1,
      orderRate: 45
    },
    {
      name: 'Cargo Pants',
      code: 'PNT1003',
      category: 'Pants',
      size: '34',
      available: 55,
      spRate: 48,
      qty: 1,
      orderRate: 48
    },
    {
      name: 'Jeans',
      code: 'PNT1004',
      category: 'Pants',
      size: '32',
      available: 70,
      spRate: 50,
      qty: 1,
      orderRate: 50
    },
    {
      name: 'Chinos',
      code: 'PNT1005',
      category: 'Pants',
      size: '34',
      available: 65,
      spRate: 42,
      qty: 1,
      orderRate: 42
    },
    {
      name: 'Track Pants',
      code: 'PNT1006',
      category: 'Pants',
      size: 'L',
      available: 75,
      spRate: 38,
      qty: 1,
      orderRate: 38
    },

    {
      name: 'Formal Shirt',
      code: 'SHT1003',
      category: 'Shirt',
      size: 'L',
      available: 70,
      spRate: 32,
      qty: 1,
      orderRate: 32
    },
    {
      name: 'Casual Shirt',
      code: 'SHT1004',
      category: 'Shirt',
      size: 'M',
      available: 75,
      spRate: 30,
      qty: 1,
      orderRate: 30
    },
    {
      name: 'Oxford Shirt',
      code: 'SHT1005',
      category: 'Shirt',
      size: 'L',
      available: 60,
      spRate: 36,
      qty: 1,
      orderRate: 36
    },
    {
      name: 'Denim Shirt',
      code: 'SHT1006',
      category: 'Shirt',
      size: 'L',
      available: 50,
      spRate: 40,
      qty: 1,
      orderRate: 40
    },
    {
      name: 'Linen Shirt',
      code: 'SHT1007',
      category: 'Shirt',
      size: 'M',
      available: 55,
      spRate: 38,
      qty: 1,
      orderRate: 38
    },
    {
      name: 'Polo Shirt',
      code: 'SHT1008',
      category: 'Shirt',
      size: 'L',
      available: 80,
      spRate: 34,
      qty: 1,
      orderRate: 34
    },
    {
      name: 'Hawaiian Shirt',
      code: 'SHT1009',
      category: 'Shirt',
      size: 'XL',
      available: 45,
      spRate: 37,
      qty: 1,
      orderRate: 37
    },
    {
      name: 'Checked Shirt',
      code: 'SHT1010',
      category: 'Shirt',
      size: 'M',
      available: 65,
      spRate: 33,
      qty: 1,
      orderRate: 33
    },
    {
      name: 'Printed Shirt',
      code: 'SHT1011',
      category: 'Shirt',
      size: 'L',
      available: 58,
      spRate: 35,
      qty: 1,
      orderRate: 35
    },
    {
      name: 'Slim Fit Shirt',
      code: 'SHT1012',
      category: 'Shirt',
      size: 'M',
      available: 52,
      spRate: 39,
      qty: 1,
      orderRate: 39
    },

    {
      name: 'Round Neck T-Shirt',
      code: 'TSH1005',
      category: 'T-Shirt',
      size: 'M',
      available: 85,
      spRate: 24,
      qty: 1,
      orderRate: 24
    },
    {
      name: 'Polo T-Shirt',
      code: 'TSH1006',
      category: 'T-Shirt',
      size: 'L',
      available: 70,
      spRate: 27,
      qty: 1,
      orderRate: 27
    },
    {
      name: 'V-Neck T-Shirt',
      code: 'TSH1007',
      category: 'T-Shirt',
      size: 'M',
      available: 65,
      spRate: 25,
      qty: 1,
      orderRate: 25
    },
    {
      name: 'Oversized T-Shirt',
      code: 'TSH1008',
      category: 'T-Shirt',
      size: 'XL',
      available: 55,
      spRate: 29,
      qty: 1,
      orderRate: 29
    },
    {
      name: 'Sports T-Shirt',
      code: 'TSH1009',
      category: 'T-Shirt',
      size: 'L',
      available: 90,
      spRate: 31,
      qty: 1,
      orderRate: 31
    },

    {
      name: 'Formal Shoes',
      code: 'SHO1005',
      category: 'Shoes',
      size: '42',
      available: 35,
      spRate: 75,
      qty: 1,
      orderRate: 75
    },
    {
      name: 'Sports Shoes',
      code: 'SHO1006',
      category: 'Shoes',
      size: '43',
      available: 48,
      spRate: 68,
      qty: 1,
      orderRate: 68
    },
    {
      name: 'Sneakers',
      code: 'SHO1007',
      category: 'Shoes',
      size: '42',
      available: 60,
      spRate: 72,
      qty: 1,
      orderRate: 72
    },
    {
      name: 'Loafers',
      code: 'SHO1008',
      category: 'Shoes',
      size: '41',
      available: 30,
      spRate: 65,
      qty: 1,
      orderRate: 65
    },
    {
      name: 'Sandals',
      code: 'SHO1009',
      category: 'Shoes',
      size: '42',
      available: 55,
      spRate: 40,
      qty: 1,
      orderRate: 40
    },

    {
      name: 'LED Bulb 5W',
      code: 'LED1001',
      category: 'LED Bulb',
      size: '5W',
      available: 200,
      spRate: 6,
      qty: 1,
      orderRate: 6
    },
    {
      name: 'LED Bulb 9W',
      code: 'LED1002',
      category: 'LED Bulb',
      size: '9W',
      available: 180,
      spRate: 8,
      qty: 1,
      orderRate: 8
    },
    {
      name: 'LED Bulb 12W',
      code: 'LED1003',
      category: 'LED Bulb',
      size: '12W',
      available: 160,
      spRate: 10,
      qty: 1,
      orderRate: 10
    },
    {
      name: 'LED Bulb 15W',
      code: 'LED1004',
      category: 'LED Bulb',
      size: '15W',
      available: 140,
      spRate: 12,
      qty: 1,
      orderRate: 12
    },

    {
      name: '1-Way Switch',
      code: 'SW1001',
      category: 'Switch',
      size: '1-Way',
      available: 150,
      spRate: 6,
      qty: 1,
      orderRate: 6
    },
    {
      name: '2-Way Switch',
      code: 'SW1002',
      category: 'Switch',
      size: '2-Way',
      available: 140,
      spRate: 8,
      qty: 1,
      orderRate: 8
    },
    {
      name: '3-Way Switch',
      code: 'SW1003',
      category: 'Switch',
      size: '3-Way',
      available: 120,
      spRate: 10,
      qty: 1,
      orderRate: 10
    },

    {
      name: '5A Socket',
      code: 'SOC1001',
      category: 'Socket',
      size: '5A',
      available: 130,
      spRate: 7,
      qty: 1,
      orderRate: 7
    },
    {
      name: '13A Socket',
      code: 'SOC1002',
      category: 'Socket',
      size: '13A',
      available: 120,
      spRate: 12,
      qty: 1,
      orderRate: 12
    },
    {
      name: '15A Socket',
      code: 'SOC1003',
      category: 'Socket',
      size: '15A',
      available: 100,
      spRate: 15,
      qty: 1,
      orderRate: 15
    },

    {
      name: 'MCB 6A',
      code: 'MCB1001',
      category: 'MCB',
      size: '6A',
      available: 80,
      spRate: 15,
      qty: 1,
      orderRate: 15
    },
    {
      name: 'MCB 10A',
      code: 'MCB1002',
      category: 'MCB',
      size: '10A',
      available: 75,
      spRate: 16,
      qty: 1,
      orderRate: 16
    },
    {
      name: 'MCB 16A',
      code: 'MCB1003',
      category: 'MCB',
      size: '16A',
      available: 70,
      spRate: 18,
      qty: 1,
      orderRate: 18
    },
    {
      name: 'MCB 20A',
      code: 'MCB1004',
      category: 'MCB',
      size: '20A',
      available: 65,
      spRate: 20,
      qty: 1,
      orderRate: 20
    },
    {
      name: 'MCB 32A',
      code: 'MCB1005',
      category: 'MCB',
      size: '32A',
      available: 60,
      spRate: 24,
      qty: 1,
      orderRate: 24
    },

    {
      name: '1.5mm Cable',
      code: 'CAB1001',
      category: 'Cable',
      size: '1.5mm',
      available: 500,
      spRate: 45,
      qty: 1,
      orderRate: 45
    },
    {
      name: '2.5mm Cable',
      code: 'CAB1002',
      category: 'Cable',
      size: '2.5mm',
      available: 450,
      spRate: 65,
      qty: 1,
      orderRate: 65
    },
    {
      name: '4mm Cable',
      code: 'CAB1003',
      category: 'Cable',
      size: '4mm',
      available: 400,
      spRate: 95,
      qty: 1,
      orderRate: 95
    },
    {
      name: '6mm Cable',
      code: 'CAB1004',
      category: 'Cable',
      size: '6mm',
      available: 350,
      spRate: 130,
      qty: 1,
      orderRate: 130
    },

    {
      name: 'LED Panel 6W',
      code: 'PANEL1001',
      category: 'LED Panel',
      size: '6W',
      available: 100,
      spRate: 18,
      qty: 1,
      orderRate: 18
    },
    {
      name: 'LED Panel 12W',
      code: 'PANEL1002',
      category: 'LED Panel',
      size: '12W',
      available: 90,
      spRate: 25,
      qty: 1,
      orderRate: 25
    },
    {
      name: 'LED Panel 18W',
      code: 'PANEL1003',
      category: 'LED Panel',
      size: '18W',
      available: 80,
      spRate: 32,
      qty: 1,
      orderRate: 32
    },
    {
      name: 'LED Panel 24W',
      code: 'PANEL1004',
      category: 'LED Panel',
      size: '24W',
      available: 70,
      spRate: 40,
      qty: 1,
      orderRate: 40
    },

    {
      name: 'Hex Nut M4',
      code: 'NUT1001',
      category: 'Nuts & Bolts',
      size: 'M4',
      available: 500,
      spRate: 1,
      qty: 1,
      orderRate: 1
    },
    {
      name: 'Hex Nut M6',
      code: 'NUT1002',
      category: 'Nuts & Bolts',
      size: 'M6',
      available: 500,
      spRate: 1.5,
      qty: 1,
      orderRate: 1.5
    },
    {
      name: 'Hex Nut M8',
      code: 'NUT1003',
      category: 'Nuts & Bolts',
      size: 'M8',
      available: 450,
      spRate: 2,
      qty: 1,
      orderRate: 2
    },
    {
      name: 'Hex Nut M10',
      code: 'NUT1004',
      category: 'Nuts & Bolts',
      size: 'M10',
      available: 400,
      spRate: 2.5,
      qty: 1,
      orderRate: 2.5
    },
    {
      name: 'Hex Nut M12',
      code: 'NUT1005',
      category: 'Nuts & Bolts',
      size: 'M12',
      available: 350,
      spRate: 3,
      qty: 1,
      orderRate: 3
    },
    {
      name: 'Lock Nut M6',
      code: 'NUT1006',
      category: 'Nuts & Bolts',
      size: 'M6',
      available: 300,
      spRate: 2,
      qty: 1,
      orderRate: 2
    },
    {
      name: 'Lock Nut M8',
      code: 'NUT1007',
      category: 'Nuts & Bolts',
      size: 'M8',
      available: 280,
      spRate: 2.5,
      qty: 1,
      orderRate: 2.5
    },
    {
      name: 'Wing Nut M6',
      code: 'NUT1008',
      category: 'Nuts & Bolts',
      size: 'M6',
      available: 250,
      spRate: 3,
      qty: 1,
      orderRate: 3
    },
    {
      name: 'Wing Nut M8',
      code: 'NUT1009',
      category: 'Nuts & Bolts',
      size: 'M8',
      available: 220,
      spRate: 4,
      qty: 1,
      orderRate: 4
    },
    {
      name: 'Bolt M6 x 20mm',
      code: 'BOLT1001',
      category: 'Nuts & Bolts',
      size: 'M6 × 20mm',
      available: 400,
      spRate: 2,
      qty: 1,
      orderRate: 2
    },
    {
      name: 'Bolt M6 x 30mm',
      code: 'BOLT1002',
      category: 'Nuts & Bolts',
      size: 'M6 × 30mm',
      available: 380,
      spRate: 2.5,
      qty: 1,
      orderRate: 2.5
    },
    {
      name: 'Bolt M8 x 30mm',
      code: 'BOLT1003',
      category: 'Nuts & Bolts',
      size: 'M8 × 30mm',
      available: 350,
      spRate: 3,
      qty: 1,
      orderRate: 3
    },
    {
      name: 'Bolt M8 x 40mm',
      code: 'BOLT1004',
      category: 'Nuts & Bolts',
      size: 'M8 × 40mm',
      available: 330,
      spRate: 3.5,
      qty: 1,
      orderRate: 3.5
    },
    {
      name: 'Bolt M10 x 50mm',
      code: 'BOLT1005',
      category: 'Nuts & Bolts',
      size: 'M10 × 50mm',
      available: 300,
      spRate: 5,
      qty: 1,
      orderRate: 5
    },
    {
      name: 'Washer M6',
      code: 'WASH1001',
      category: 'Nuts & Bolts',
      size: 'M6',
      available: 600,
      spRate: 0.8,
      qty: 1,
      orderRate: 0.8
    },
    {
      name: 'Washer M8',
      code: 'WASH1002',
      category: 'Nuts & Bolts',
      size: 'M8',
      available: 550,
      spRate: 1,
      qty: 1,
      orderRate: 1
    },
    {
      name: 'Washer M10',
      code: 'WASH1003',
      category: 'Nuts & Bolts',
      size: 'M10',
      available: 500,
      spRate: 1.5,
      qty: 1,
      orderRate: 1.5
    }
  ];

  /* =========================================
     SELECTED PRODUCTS
     ========================================= */

  products: OrderItem[] = [];

  /* =========================================
     PRODUCT SELECTOR / SEARCH
     ========================================= */

  productCategory = 'All Products';
  productSearch = '';

  cataloguePage = 1;
  cataloguePageSize = 5;

  /* =========================================
     MAIN FIELDS
     ========================================= */

  routePlan = '';
  voucherType = '';
  voucherNumber = '';
  date = '';
  customer = '';

  /* ACCOUNT DETAILS */

  balance = 3250;
  overdue = 750;
  lastPayment = '12 Sep';

  deliveryDate = '';

  notes = '';

  orderId = '';
  authorized = false;

  showVoucherTypeSelector = false;

  showSaveSuccess = false;
  savedOrderNumber = '';

  /* =========================================
     LIST MODAL
     ========================================= */

  showList = false;
  search = '';
  page = 1;
  pageSize = 5;

  /* =========================================
     DELETE CONFIRMATION MODAL
     ========================================= */

  showDeleteModal = false;
  orderToDelete: SalesOrder | null = null;

  /* =========================================
     SAVE DRAFT SUCCESS POPUP
     ========================================= */

  showDraftSuccess = false;
  savedDraftNumber = '';

  constructor(
    private router: Router,
    private store: OrderStoreService
  ) {}

  ngOnInit(): void {
    const current = this.store.getCurrent();

    if (current) {
      this.loadOrder(current);
    } else {
      this.date = this.getCurrentSystemDate();
    }
  }

  /* =========================================
     CURRENT SYSTEM DATE
     ========================================= */

  private getCurrentSystemDate(): string {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  }

  /* =========================================
     LOAD ORDER
     ========================================= */

  private loadOrder(order: SalesOrder): void {
    this.orderId = order.id;
    this.routePlan = order.routePlan;
    this.voucherType = order.voucherType;
    this.voucherNumber = order.voucherNumber;
    this.date = order.date;
    this.customer = order.customer;

    this.balance = order.balance;
    this.overdue = order.overdue;
    this.lastPayment = order.lastPayment;

    this.deliveryDate = order.deliveryDate;
    this.notes = order.notes;

    this.authorized = order.authorized;

    this.products = order.items.map(item => ({
      ...item
    }));
  }

  /* =========================================
     VOUCHER TYPE SELECTOR
     ========================================= */

  openVoucherTypeSelector(): void {
    this.showVoucherTypeSelector = true;
  }

  closeVoucherTypeSelector(): void {
    this.showVoucherTypeSelector = false;
  }

  private getNextVoucherNumber(): string {
    const orders = this.store.getOrders();

    let nextNumber = 10001;

    for (const order of orders) {
      const match = order.voucherNumber?.match(/^VR-(\d+)$/);

      if (match) {
        nextNumber = Math.max(
          nextNumber,
          Number(match[1]) + 1
        );
      }
    }

    return `VR-${nextNumber}`;
  }

  selectVoucherType(type: string): void {
    this.voucherType = type;

    if (
      type === 'Voucher Receipt' &&
      !this.voucherNumber
    ) {
      this.voucherNumber = this.getNextVoucherNumber();
    }

    this.showVoucherTypeSelector = false;
  }

  /* =========================================
     PRODUCT CATEGORY
     ========================================= */

  get productCategories(): string[] {
    return [
      'All Products',
      'PVC Trunking',
      'Pants',
      'Shirt',
      'T-Shirt',
      'Shoes',
      'LED Bulb',
      'Switch',
      'Socket',
      'MCB',
      'Cable',
      'LED Panel',
      'Nuts & Bolts'
    ];
  }

  getProductCategory(product: CatalogueProduct): string {
    return product.category;
  }

  onProductCategoryChange(): void {
    this.productSearch = '';
    this.cataloguePage = 1;
  }

  onProductSearchChange(): void {
    this.cataloguePage = 1;
  }

  clearProductSearch(): void {
    this.productSearch = '';
    this.cataloguePage = 1;
  }

  /* =========================================
     FILTERED PRODUCT CATALOGUE
     ========================================= */

  get filteredProductCatalogue(): CatalogueProduct[] {
    let products = this.productCatalogue;

    if (this.productCategory === 'All Products') {
      const parentProductCodes = [
        'PNT1001',
        'SHT1002',
        'TSH1003',
        'SHO1004'
      ];

      products = products.filter(
        product => !parentProductCodes.includes(product.code)
      );
    } else {
      products = products.filter(
        product => product.category === this.productCategory
      );
    }

    const value = this.productSearch.trim().toLowerCase();

    if (value) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(value) ||
        product.code.toLowerCase().includes(value) ||
        product.size.toLowerCase().includes(value)
      );
    }

    return products;
  }

  /* =========================================
     PRODUCT CATALOGUE ROW WIDTH
     ========================================= */

  get isFullWidthCatalogue(): boolean {
    return (
      this.productCategory === 'All Products' &&
      !this.productSearch.trim() &&
      this.pagedProductCatalogue.length === this.cataloguePageSize
    );
  }

  /* =========================================
     PRODUCT CATALOGUE PAGINATION
     ========================================= */

  get pagedProductCatalogue(): CatalogueProduct[] {
    const start =
      (this.cataloguePage - 1) *
      this.cataloguePageSize;

    return this.filteredProductCatalogue.slice(
      start,
      start + this.cataloguePageSize
    );
  }

  get cataloguePageCount(): number {
    return Math.max(
      1,
      Math.ceil(
        this.filteredProductCatalogue.length /
        this.cataloguePageSize
      )
    );
  }

  firstCataloguePage(): void {
    this.cataloguePage = 1;
  }

  previousCataloguePage(): void {
    this.cataloguePage = Math.max(
      1,
      this.cataloguePage - 1
    );
  }

  nextCataloguePage(): void {
    this.cataloguePage = Math.min(
      this.cataloguePageCount,
      this.cataloguePage + 1
    );
  }

  lastCataloguePage(): void {
    this.cataloguePage = this.cataloguePageCount;
  }

  /* =========================================
     SELECT PRODUCT FROM CATALOGUE
     ========================================= */

  selectCatalogueProduct(product: CatalogueProduct): void {
    this.addProduct(product);
  }

  /* =========================================
     PRODUCTS / ORDER ROWS
     ========================================= */

  addProduct(product: OrderItem): void {
    const existing = this.products.find(
      item => item.code === product.code
    );

    if (existing) {
      existing.qty++;
      return;
    }

    this.products.push({
      ...product,
      qty: 1,
      orderRate: product.spRate
    });
  }

  amount(product: OrderItem): number {
    return product.qty * product.orderRate;
  }

  get subtotal(): number {
    return this.products.reduce(
      (sum, product) =>
        sum + this.amount(product),
      0
    );
  }

  get vat(): number {
    return this.subtotal * 0.05;
  }

  get total(): number {
    return this.subtotal + this.vat;
  }

  adjustQty(
    product: OrderItem,
    delta: number
  ): void {
    product.qty = Math.max(
      1,
      product.qty + delta
    );
  }

  adjustRate(
    product: OrderItem,
    delta: number
  ): void {
    product.orderRate = Math.max(
      0,
      product.orderRate + delta
    );
  }

  deleteProduct(product: OrderItem): void {
    this.products = this.products.filter(
      item => item !== product
    );
  }

  /* =========================================
     AUTHORIZE
     ========================================= */

  toggleAuthorize(): void {
    this.authorized = !this.authorized;
  }

  /* =========================================
     CREATE UNIQUE ORDER ID
     ========================================= */

  private getNextOrderId(): string {
    const orders = this.store.getOrders();

    let nextNumber = 10001;

    for (const order of orders) {
      const match = order.id?.match(/^SO-(\d+)$/);

      if (match) {
        nextNumber = Math.max(
          nextNumber,
          Number(match[1]) + 1
        );
      }
    }

    return `SO-${nextNumber}`;
  }

  /* =========================================
     BUILD ORDER
     ========================================= */

  private buildOrder(): SalesOrder {
    if (!this.orderId) {
      this.orderId = this.getNextOrderId();
    }

    if (
      !this.voucherNumber &&
      this.voucherType === 'Voucher Receipt'
    ) {
      this.voucherNumber = this.getNextVoucherNumber();
    }

    return {
      id: this.orderId,

      voucherNumber: this.voucherNumber,

      voucherType: this.voucherType,

      routePlan: this.routePlan,

      date: this.date,

      customer: this.customer,

      balance: this.balance,

      overdue: this.overdue,

      lastPayment: this.lastPayment,

      deliveryDate: this.deliveryDate,

      notes: this.notes,

      authorized: this.authorized,

      status: this.authorized
        ? 'Approved'
        : 'Pending',

      isDraft: !this.authorized,

      items: this.products.map(
        product => ({
          ...product
        })
      )
    };
  }

  /* =========================================
     SAVE
     ========================================= */

  save(): void {
    const saved = this.store.commit(
      this.buildOrder()
    );

    this.orderId = saved.id;
    this.voucherNumber = saved.voucherNumber;

    this.store.setCurrent(saved);

    this.savedOrderNumber =
      saved.voucherNumber;

    this.showSaveSuccess = true;

    setTimeout(() => {
      this.showSaveSuccess = false;
    }, 2000);
  }

  closeSaveSuccess(): void {
    this.showSaveSuccess = false;
  }

  /* =========================================
     REVIEW
     ========================================= */

  review(): void {
    const order = this.buildOrder();

    this.store.setCurrent(order);

    this.router.navigate([
      '/review-order'
    ]);
  }

  /* =========================================
     SAVE DRAFT
     ========================================= */

  draft(): void {
    const saved = this.store.saveDraft(
      this.buildOrder()
    );

    this.orderId = saved.id;
    this.voucherNumber = saved.voucherNumber;

    this.savedDraftNumber =
      saved.voucherNumber;

    this.showDraftSuccess = true;

    setTimeout(() => {
      this.showDraftSuccess = false;

      this.router.navigate([
        '/saved-draft'
      ]);
    }, 1000);
  }

  closeDraftSuccess(): void {
    this.showDraftSuccess = false;
  }

  /* =========================================
     LIST MODAL
     ========================================= */

  openList(): void {
    this.search = '';
    this.page = 1;
    this.showList = true;
  }

  closeList(): void {
    this.showList = false;
  }

  get filteredOrders(): SalesOrder[] {
    const value =
      this.search.trim().toLowerCase();

    const orders =
      this.store.getOrders();

    if (!value) {
      return orders;
    }

    return orders.filter(order =>
      order.voucherNumber
        .toLowerCase()
        .includes(value) ||

      order.customer
        .toLowerCase()
        .includes(value) ||

      order.status
        .toLowerCase()
        .includes(value) ||

      order.voucherType
        .toLowerCase()
        .includes(value)
    );
  }

  get pagedOrders(): SalesOrder[] {
    const start =
      (this.page - 1) *
      this.pageSize;

    return this.filteredOrders.slice(
      start,
      start + this.pageSize
    );
  }

  get pageCount(): number {
    return Math.max(
      1,
      Math.ceil(
        this.filteredOrders.length /
        this.pageSize
      )
    );
  }

  get orderPageNumbers(): number[] {
    return Array.from(
      { length: this.pageCount },
      (_, index) => index + 1
    );
  }

  editOrder(order: SalesOrder): void {
    this.store.beginEdit(order.id);

    const current =
      this.store.getCurrent();

    if (current) {
      this.loadOrder(current);
    }

    this.showList = false;
  }

  /* =========================================
     DELETE CONFIRMATION MODAL
     ========================================= */

  deleteOrder(order: SalesOrder): void {
    this.orderToDelete = order;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.orderToDelete = null;
  }

  confirmDeleteOrder(): void {
    if (!this.orderToDelete) {
      return;
    }

    const order =
      this.orderToDelete;

    const wasCurrent =
      this.orderId === order.id;

    const ordersBeforeDelete =
      this.store.getOrders();

    const deletedIndex =
      ordersBeforeDelete.findIndex(
        item => item.id === order.id
      );

    if (deletedIndex < 0) {
      this.closeDeleteModal();
      return;
    }

    const deleted =
      this.store.deleteOrder(order.id);

    if (!deleted) {
      this.closeDeleteModal();
      return;
    }

    if (wasCurrent) {
      const remainingOrders =
        this.store.getOrders();

      if (remainingOrders.length > 0) {
        const nextIndex =
          Math.min(
            deletedIndex,
            remainingOrders.length - 1
          );

        const nextOrder =
          remainingOrders[nextIndex];

        this.loadOrder(nextOrder);

        this.store.setCurrent(
          nextOrder
        );
      } else {
        this.store.beginNew();
        this.resetNewOrderForm();
      }
    }

    this.page = Math.min(
      this.page,
      this.pageCount
    );

    this.closeDeleteModal();
  }

  firstPage(): void {
    this.page = 1;
  }

  previousPage(): void {
    this.page = Math.max(
      1,
      this.page - 1
    );
  }

  nextPage(): void {
    this.page = Math.min(
      this.pageCount,
      this.page + 1
    );
  }

  lastPage(): void {
    this.page = this.pageCount;
  }

  amountForItems = (
    sum: number,
    item: {
      qty: number;
      orderRate: number;
    }
  ): number => {
    return (
      sum +
      item.qty *
      item.orderRate
    );
  };

  /* =========================================
     ORDER NAVIGATION
     ========================================= */

  get savedOrders(): SalesOrder[] {
    return this.store.getOrders();
  }

  /*
   * IMPORTANT:
   *
   * OrderStoreService stores the newest order first.
   *
   * Example store order:
   *
   * [SO-10002, SO-10001]
   *
   * For Previous / Next we need:
   *
   * [SO-10001, SO-10002]
   *
   * Therefore navigation uses a reversed copy.
   *
   * First saved order:
   * Previous = disabled
   * Next = enabled
   *
   * Second/latest saved order:
   * Previous = enabled
   * Next = disabled
   */
  private get navigationOrders(): SalesOrder[] {
    return [...this.store.getOrders()].reverse();
  }

  get currentOrderIndex(): number {
    if (!this.orderId) {
      return -1;
    }

    return this.navigationOrders.findIndex(
      order => order.id === this.orderId
    );
  }

  get canGoPrevious(): boolean {
    const index = this.currentOrderIndex;

    return (
      index > 0 &&
      this.navigationOrders.length > 1
    );
  }

  get canGoNext(): boolean {
    const index = this.currentOrderIndex;

    return (
      index >= 0 &&
      index < this.navigationOrders.length - 1
    );
  }

  previousOrder(): void {
    const orders = this.navigationOrders;

    const index = orders.findIndex(
      order => order.id === this.orderId
    );

    if (index <= 0) {
      return;
    }

    const previousOrder =
      orders[index - 1];

    this.loadOrder(previousOrder);

    this.store.setCurrent(
      previousOrder
    );
  }

  nextOrder(): void {
    const orders = this.navigationOrders;

    const index = orders.findIndex(
      order => order.id === this.orderId
    );

    if (
      index < 0 ||
      index >= orders.length - 1
    ) {
      return;
    }

    const nextOrder =
      orders[index + 1];

    this.loadOrder(nextOrder);

    this.store.setCurrent(
      nextOrder
    );
  }

  /* =========================================
     NAVIGATION
     ========================================= */

  cancel(): void {
    this.router.navigate([
      '/sales-order'
    ]);
  }

  add(): void {
    this.store.beginNew();

    this.resetNewOrderForm();

    this.router.navigate([
      '/new-order'
    ]);
  }

  private resetNewOrderForm(): void {
    this.orderId = '';

    this.routePlan = '';

    this.voucherType = '';

    this.voucherNumber = '';

    this.date =
      this.getCurrentSystemDate();

    this.customer = '';

    this.balance = 3250;

    this.overdue = 750;

    this.lastPayment = '12 Sep';

    this.deliveryDate = '';

    this.notes = '';

    this.authorized = false;

    this.products = [];

    this.productCategory =
      'All Products';

    this.productSearch = '';

    this.cataloguePage = 1;

    this.showVoucherTypeSelector =
      false;

    this.showSaveSuccess =
      false;

    this.savedOrderNumber = '';

    this.showDeleteModal =
      false;

    this.orderToDelete = null;

    this.showDraftSuccess =
      false;

    this.savedDraftNumber = '';
  }

  list(): void {
    this.openList();
  }
}