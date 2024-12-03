import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OffersService } from '../services/offers.service';
import { BusinessService } from '../services/business.service';
import { OfferTypesService } from '../services/offer-types.service';

import { Buffer } from 'buffer';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  businesses: any[] = [];
  offers: any[] = [];
  selectedBusinessId: number | null = null; 
  isEditing = false;
  selectedOfferId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private offersService: OffersService,
    private businessService: BusinessService,
    private offerTypesService: OfferTypesService
  ) {
    
  }

  ngOnInit(): void {
    this.loadBusinesses();
    
  }

  loadBusinesses(): void {
    this.businessService.getBusinesses().subscribe((data: any[]) => {
      this.businesses = data;
    });
  }

 

  onBusinessChange(event: Event): void {
    const selectedBusinessId = (event.target as HTMLSelectElement).value;
    this.selectedBusinessId = parseInt(selectedBusinessId, 10);
    if (this.selectedBusinessId) {
      this.loadOffersByBusinessId(this.selectedBusinessId);
    } else {
      this.offers = [];
    }
  }

  loadOffersByBusinessId(businessId: number): void {
    this.offersService.getOffersByBusinessId(businessId).subscribe((data: any[]) => {
      this.offers = data.map(offer => ({
        ...offer,
        qr_code: this.bufferToBase64(offer.qr_code.data) // Convert Buffer to Base64
      }));
    });
  }

  private bufferToBase64(bufferData: number[]): string {
    const buffer = Buffer.from(bufferData); // Create Buffer from array of bytes
    return buffer.toString('base64'); // Convert Buffer to Base64 string
  }

  

  deleteOffer(offerId: number): void {
    this.offersService.deleteOffer(offerId).subscribe(() => {
      alert('Offer deleted successfully');
      this.loadOffersByBusinessId(this.selectedBusinessId as number); 
    });
  }

  resetForm(): void {
    
    this.isEditing = false;
    this.selectedOfferId = null;
  }
}
