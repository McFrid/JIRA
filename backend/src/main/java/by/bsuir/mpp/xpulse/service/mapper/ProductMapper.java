package by.bsuir.mpp.xpulse.service.mapper;

import by.bsuir.mpp.xpulse.domain.*;
import by.bsuir.mpp.xpulse.service.dto.ProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Product and its DTO ProductDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, StoryMapper.class})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {



    default Product fromId(Long id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
