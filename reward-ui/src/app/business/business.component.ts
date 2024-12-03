// business.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusinessService } from '../services/business.service';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  businessForm: FormGroup;
  addressForm: FormGroup; // Added addressForm
  serviceForm: FormGroup;
  businesses: any[] = [];
  services: any[] = [];
  selectedBusinessId: number | null = null;
  isEditMode: boolean = false;
  editingServiceId: number | null = null;


  // Toggle states for expand/collapse sections
  isBusinessSectionExpanded = true;
  isAddressSectionExpanded = true;
  isServicesSectionExpanded = true;
  isExistingServicesSectionExpanded = true;

  constructor(private fb: FormBuilder, private businessService: BusinessService, private addressService: AddressService) {
    this.businessForm = this.fb.group({
      name: [''],
      business_type: ['']
    });

    this.addressForm = this.fb.group({
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required],
      business_id: [null, Validators.required] 
    });

    this.serviceForm = this.fb.group({
      serviceName: [''],
      price: [0]
    });
  }

  ngOnInit() {
    this.loadBusinesses();
  }

  onBusinessSubmit() {
    if (this.businessForm.valid) {
      const businessData = this.businessForm.value;
      this.businessService.saveBusinessDetails(businessData).subscribe(response => {
        alert('Business saved successfully');
        this.loadBusinesses();
        this.businessForm.reset();
      });
    }
  }

  onAddressSubmit(): void {
    if (this.addressForm.valid) {
      this.addressService.addAddress(this.addressForm.value).subscribe(response => {
        alert('Address saved successfully');
        this.addressForm.reset();
        this.isAddressSectionExpanded = false;
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  onServiceSubmit() {
    if (this.serviceForm.valid && this.selectedBusinessId) {
      const serviceData: any = {
        service_name: this.serviceForm.value.serviceName,
        price: this.serviceForm.value.price
      };

      if (this.isEditMode && this.editingServiceId) {
        // Update the existing service
        this.businessService.updateService(this.editingServiceId, serviceData).subscribe(response => {
          alert('Service updated successfully');
          this.loadServices();
          this.resetServiceForm();
        });
      } else {
        // Add a new service
        serviceData.business_id = this.selectedBusinessId;
        this.businessService.addService(serviceData).subscribe(response => {
          console.log(response)
          alert('Service added successfully');
          this.services.push(response);
          this.loadServices();
          this.resetServiceForm();
        });
      }
    } else {
      alert('Please select a business first');
    }
  }

  loadBusinesses() {
    this.businessService.getBusinesses().subscribe(response => {
      this.businesses = response;
      if (this.businesses.length > 0) {
        this.selectedBusinessId = this.businesses[0].business_id;
        this.loadServices();
      }
    });
  }

  loadServices() {
    if (this.selectedBusinessId) {
      this.businessService.getServices(this.selectedBusinessId).subscribe((response: any) => {
        this.services = response.services; 
      });
    }
  }

  editService(service: any) {
    this.serviceForm.patchValue({
      serviceName: service.service_name,
      price: service.price
    });
    this.isEditMode = true;
    this.editingServiceId = service.service_id;
  }

  deleteService(serviceId: number) {
    this.businessService.deleteService(serviceId).subscribe(() => {
      this.services = this.services.filter(service => service.id !== serviceId);
      this.loadServices();
    });
  }

  resetServiceForm() {
    this.serviceForm.reset();
    this.isEditMode = false;
    this.editingServiceId = null;
  }
  onReset() {
    this.resetServiceForm();
  }

  // Toggle methods for expand/collapse functionality
  toggleBusinessSection() {
    this.isBusinessSectionExpanded = !this.isBusinessSectionExpanded;
  }

  toggleAddressSection() {
    this.isAddressSectionExpanded = !this.isAddressSectionExpanded;
  }

  toggleServicesSection() {
    this.isServicesSectionExpanded = !this.isServicesSectionExpanded;
  }

  toggleExistingServicesSection() {
    this.isExistingServicesSectionExpanded = !this.isExistingServicesSectionExpanded;
  }
}
