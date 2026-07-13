import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from '../../services/order.service';
import { ReviewService } from 'src/app/core/services/review.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];

  backendUrl = 'http://localhost:3000';

  loading = true;

  showReviewModal = false;

  review = {
    product: '',
    order: '',
    rating: 5,
    comment: '',
  };

  constructor(
    private orderService: OrderService,
    private reviewService: ReviewService,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getMyOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  openReviewModal(productId: string, orderId: string) {
    this.review = {
      product: productId,
      order: orderId,
      rating: 5,
      comment: '',
    };

    this.showReviewModal = true;
  }

  closeReviewModal() {
    this.showReviewModal = false;

    this.review = {
      product: '',
      order: '',
      rating: 5,
      comment: '',
    };
  }

  submitReview() {
    this.reviewService.createReview(this.review).subscribe({
      next: () => {
        alert('Review submitted successfully.');

        this.closeReviewModal();
      },
      error: (err) => {
        console.error(err);

        alert(err.error.message || 'Failed to submit review.');
      },
    });
  }

  getImageUrl(image: string | undefined) {
    if (!image) {
      return 'assets/no-image.png';
    }

    if (image.startsWith('http')) {
      return image;
    }

    return this.backendUrl + image;
  }
}
