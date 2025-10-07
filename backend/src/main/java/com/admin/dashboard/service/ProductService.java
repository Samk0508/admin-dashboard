package com.admin.dashboard.service;

import com.admin.dashboard.dto.ProductDTO;
import com.admin.dashboard.entity.Product;
import com.admin.dashboard.entity.User;
import com.admin.dashboard.repository.ProductRepository;
import com.admin.dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private UserRepository userRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToDTO(product);
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        product.setProductCode(generateProductCode());
        
        // Auto-fill description with product name
        if (productDTO.getDescription() == null || productDTO.getDescription().trim().isEmpty()) {
            product.setDescription(productDTO.getProductName());
        }
        
        if (productDTO.getCreatedById() != null) {
            User user = userRepository.findById(productDTO.getCreatedById())
                .orElseThrow(() -> new RuntimeException("User not found"));
            product.setCreatedBy(user);
        }
        
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
        
        product.setProductName(productDTO.getProductName());
        product.setDescription(productDTO.getDescription());
        product.setRate(productDTO.getRate());
        product.setTaxPercent(productDTO.getTaxPercent());
        product.setImage(productDTO.getImage());
        
        if (productDTO.getCreatedById() != null) {
            User user = userRepository.findById(productDTO.getCreatedById())
                .orElseThrow(() -> new RuntimeException("User not found"));
            product.setCreatedBy(user);
        }
        
        Product updatedProduct = productRepository.save(product);
        return convertToDTO(updatedProduct);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }

    private String generateProductCode() {
        String code;
        do {
            code = "PRD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        } while (productRepository.existsByProductCode(code));
        return code;
    }

    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(
            product.getId(),
            product.getProductName(),
            product.getProductCode(),
            product.getDescription(),
            product.getRate(),
            product.getTaxPercent(),
            product.getFinalRate(),
            product.getImage(),
            product.getCreatedBy() != null ? product.getCreatedBy().getId() : null,
            product.getCreatedBy() != null ? product.getCreatedBy().getName() : null
        );
    }

    private Product convertToEntity(ProductDTO productDTO) {
        Product product = new Product();
        product.setProductName(productDTO.getProductName());
        product.setDescription(productDTO.getDescription());
        product.setRate(productDTO.getRate());
        product.setTaxPercent(productDTO.getTaxPercent());
        product.setImage(productDTO.getImage());
        return product;
    }
}
