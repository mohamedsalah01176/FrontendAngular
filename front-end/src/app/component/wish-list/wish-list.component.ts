import { Component } from '@angular/core';
import { WishlistService } from '../../util/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent {
  wishlist: any[] = [];
  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlist = res.wishlist;
      },
      error: (err) => {
        console.error('Failed to load wishlist', err);
      },
    });
  }
}
