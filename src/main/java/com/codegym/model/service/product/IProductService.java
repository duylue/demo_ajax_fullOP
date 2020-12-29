package com.codegym.model.service.product;

import com.codegym.model.entities.Product;

import java.util.List;

public interface IProductService {
    List<Product> findAll();
    Product findById(int id);
    Product save(Product product);
    boolean remove(int id);
}
