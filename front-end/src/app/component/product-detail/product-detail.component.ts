import { ProductService } from '../../util/services/product.service';
import { faHeart, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../util/interfaces/iproduct';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../util/services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [
    FontAwesomeModule,
    CarouselModule,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService],
})
export class ProductDetailComponent implements OnInit {
  faHeart = faHeart;
  faPaperPlane = faPaperPlane;

  mainCarouselOptions = {
    items: 1,
    dots: true,
    nav: false,
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 4000,
    margin: 10,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
    },
  };

  productDetails = {
    _id: '',
    title: '',
    category: { name: '' },
    images: [],
    price: 0,
    description: '',
    quantity: 0,
  };

  productComments = [
    {
      _id: '',
      userId: '',
      comment: '',
      userName: '',
      createdAt: new Date(),
      userImage: '',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService,
    private cdr: ChangeDetectorRef,
    private CartService: CartService,
    private router: Router
  ) {}

  user = {
    userID: '',
    userName: '',
  };

  getAllComments() {
    const productId = this.route.snapshot.params['id'];

    this.ProductService.getAllComments(productId).subscribe({
      next: (res) => {
        this.productComments = res.data.Comments;
      },
      error: (err) => console.error(err),
    });
  }

  getProductDetails() {
    const productId = this.route.snapshot.params['id'];

    this.ProductService.getSpecificProduct(productId).subscribe({
      next: (res) => {
        this.productDetails = res.product[0];
      },
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('userToken='))
      ?.split('=')[1];

    this.user = jwtDecode<DecodedToken>(token as string);

    this.getProductDetails();
    this.getAllComments();
  }

  userComment = '';

  addComment() {
    const productId = this.route.snapshot.params['id'];

    const comment = {
      userId: this.user.userID,
      userName: this.user.userName,
      comment: this.userComment,
      createdAt: new Date(),
      userImage: 'https://placehold.co/80?text=User',
    };
    this.ProductService.addComment(productId, comment).subscribe({
      next: (res) => {
        this.productComments = [...res.data.Comments];
        this.userComment = '';

        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }
  deleteComment(productId: string, commentId: string) {
    this.ProductService.deleteComment(productId, commentId).subscribe({
      next: (res) => {
        this.productComments = res.data;
      },
      error: (err) => console.error(err),
    });
  }

  editPopupIsOpened = false;

  commentIdForEdit = '';
  editPopupIsOpen(commentId: string) {
    this.commentIdForEdit = commentId;

    const myComment = this.productComments.filter(
      (comment) => comment._id === commentId
    );

    this.newComment = myComment[0]?.comment || '';
    this.editPopupIsOpened = true;
  }

  editPopupIsClosed() {
    this.editPopupIsOpened = false;
  }

  newComment = '';
  editComment(productId: string) {
    this.ProductService.editComment(
      productId,
      this.commentIdForEdit,
      this.newComment
    ).subscribe({
      next: (res) => {
        this.productComments = res.data;
        this.editPopupIsOpened = false;
        this.newComment = '';
      },
      error: (err) => console.error(err),
    });
  }

addToCart(productId: string): void {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('userToken='))
    ?.split('=')[1];

  if (!token) {
    console.error('User not authenticated');
    return;
  }

  this.CartService.addToCart(productId, token).subscribe({
    next: (response) => {
      console.log('Product added to cart:', response);
      this.router.navigate(['/cart']);
    },
    error: (error) => {
      console.error('Error adding product to cart:', error);
    }
  });
}


}
