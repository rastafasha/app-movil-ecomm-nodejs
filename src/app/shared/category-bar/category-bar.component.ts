import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.css']
})
export class CategoryBarComponent implements OnInit {

  public categorias: any;

  constructor(
    private categoriaService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.loadCategories();

  }
  loadCategories(){
    this.categoriaService.getCategoriesActivas().subscribe(
      resp => {
        this.categorias = resp;
        // console.log(this.categorias);
      }
    )
  }

}
