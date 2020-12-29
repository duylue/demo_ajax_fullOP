package com.codegym.model.service.product;

import com.codegym.model.entities.Product;
import com.codegym.model.repositories.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ProductServiceImpl implements IProductService {

    @Autowired
    private IProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product findById(int id) {
        return productRepository.findOne(id);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public boolean remove(int id) {
        boolean isDelete = false;
         try{
             productRepository.delete(id);
             isDelete = true;
         }catch (Exception ex){
             System.out.println(ex);
         }
         return isDelete;
    }
}
