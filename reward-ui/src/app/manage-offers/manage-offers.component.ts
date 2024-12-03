import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OffersService } from '../services/offers.service';
import { BusinessService } from '../services/business.service';
import { OfferTypesService } from '../services/offer-types.service';

import { Buffer } from 'buffer';
@Component({
  selector: 'app-manage-offers',
  templateUrl: './manage-offers.component.html',
  styleUrls: ['./manage-offers.component.css']
})
export class ManageOffersComponent {
  offerForm: FormGroup;
  businesses: any[] = [];
  offerTypes: any[] = [];

  isEditing = false;
  selectedOfferId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private offersService: OffersService,
    private businessService: BusinessService,
    private offerTypesService: OfferTypesService
  ) {
    this.offerForm = this.fb.group({
      business_id: [''],
      offer_name: [''],
      description: [''],
      visit_threshold: [''],
      offer_type_id: [''],
    });
  }

  ngOnInit(): void {
    this.loadBusinesses();
    this.loadOfferTypes();
  }

  loadBusinesses(): void {
    this.businessService.getBusinesses().subscribe((data: any[]) => {
      this.businesses = data;
    });
  }

  loadOfferTypes(): void {
    this.offerTypesService.getOfferTypes().subscribe((data: any[]) => {
      this.offerTypes = data;
    });
  }

  onBusinessChange(event: Event): void {
    const selectedBusinessId = (event.target as HTMLSelectElement).value;
    if (selectedBusinessId) {
      this.offerForm.patchValue({ business_id: selectedBusinessId }); // Set businessId in the form
      
    }
  }

  

  private bufferToBase64(bufferData: number[]): string {
    const buffer = Buffer.from(bufferData); // Create Buffer from array of bytes
    return buffer.toString('base64'); // Convert Buffer to Base64 string
  }

  onOfferSubmit(): void {
    if (this.offerForm.valid) {
      const offerData = this.offerForm.value;
      if (this.isEditing && this.selectedOfferId) {
        // Update existing offer
        this.offersService.updateOffer(this.selectedOfferId, offerData).subscribe(() => {
          alert('Offer updated successfully');
          
          this.resetForm();
        });
      } else {
        // Add new offer
        this.offersService.createOffer(offerData).subscribe(() => {
          alert('Offer added successfully');
          this.resetForm();
        });
      }
    }
  }

  

  resetForm(): void {
    this.offerForm.reset();
    this.isEditing = false;
    this.selectedOfferId = null;
  }
}
