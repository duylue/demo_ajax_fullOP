package com.codegym.model.entities;

import java.util.Arrays;

public class ProductIdList {
private int[] ids;
@Override
public String toString() {
    return "ProductIdList{" +
            "ids=" + Arrays.toString(ids) +
            '}';
}


    public ProductIdList(int[] ids) {
        this.ids = ids;
    }

    public ProductIdList() {
    }

    public int[] getIds() {
        return ids;
    }

    public void setIds(int[] ids) {
        this.ids = ids;
    }
}
