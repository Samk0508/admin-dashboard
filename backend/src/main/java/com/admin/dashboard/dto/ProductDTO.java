package com.admin.dashboard.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class ProductDTO {
    private Long id;
    
    @NotBlank
    private String productName;
    
    private String productCode;
    private String description;
    
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal rate;
    
    @NotNull
    @DecimalMin(value = "0.0")
    private BigDecimal taxPercent;
    
    private BigDecimal finalRate;
    private String image;
    private Long createdById;
    private String createdByName;

    public ProductDTO() {}

    public ProductDTO(Long id, String productName, String productCode, String description, 
                     BigDecimal rate, BigDecimal taxPercent, BigDecimal finalRate, 
                     String image, Long createdById, String createdByName) {
        this.id = id;
        this.productName = productName;
        this.productCode = productCode;
        this.description = description;
        this.rate = rate;
        this.taxPercent = taxPercent;
        this.finalRate = finalRate;
        this.image = image;
        this.createdById = createdById;
        this.createdByName = createdByName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductCode() { return productCode; }
    public void setProductCode(String productCode) { this.productCode = productCode; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getRate() { return rate; }
    public void setRate(BigDecimal rate) { this.rate = rate; }

    public BigDecimal getTaxPercent() { return taxPercent; }
    public void setTaxPercent(BigDecimal taxPercent) { this.taxPercent = taxPercent; }

    public BigDecimal getFinalRate() { return finalRate; }
    public void setFinalRate(BigDecimal finalRate) { this.finalRate = finalRate; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public Long getCreatedById() { return createdById; }
    public void setCreatedById(Long createdById) { this.createdById = createdById; }

    public String getCreatedByName() { return createdByName; }
    public void setCreatedByName(String createdByName) { this.createdByName = createdByName; }
}
