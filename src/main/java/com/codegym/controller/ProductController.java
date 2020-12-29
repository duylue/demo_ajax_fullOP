package com.codegym.controller;

import com.codegym.model.entities.Product;
import com.codegym.model.entities.ProductIdList;
import com.codegym.model.entities.Response;
import com.codegym.model.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private IProductService productService;
    Response res = new Response();

    @GetMapping()
    public Response get(){
        List<Product> products = productService.findAll();
        res.data = products;
        res.status = res.SUCCESS;
        res.message = "Success";
        return res;
    }
    @GetMapping("/product")
    public Response get(@RequestParam int id){

        res.data = productService.findById(id);
        res.status = res.SUCCESS;
        res.message = "Success";
        return res;
    }

    @PostMapping("/create")
    public Response save(@RequestBody Product p){
        Product product = productService.save(p);
        res.data = product;
        res.status = res.SUCCESS;
        res.message = "Success";
        return res;
    }
    @PostMapping("/arr")
    public Response deleteMulti(@RequestBody ProductIdList idList){

        for (int x: idList.getIds()
             ) {
           productService.remove(x);
        }
        res.data = idList;
        res.status = res.SUCCESS;
        res.message = "Success";
        return res;
    }

    @DeleteMapping
    public Response delete(@RequestParam int id){
        boolean isDelete = productService.remove(id);
        res.data = isDelete;
        res.status = res.SUCCESS;
        res.message = "Success";
        return res;
    }

    @PutMapping("/update")
    public Response update(@RequestBody Product p){
        Product product=  productService.save(p);
        res.data = product;
        res.status = res.SUCCESS;
        res.message = "Success";
        return res;
    }
}
