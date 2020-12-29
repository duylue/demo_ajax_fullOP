package com.codegym.model.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {
    @Id
    private int id;
    private String name;
    private float price;
    private int categoryId;
    private String image;

    public Product() {
    }

    public Product(String name, float price, int categoryId, String image) {
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.image = image;
    }

    public Product(int id, String name, float price, int categoryId, String image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
