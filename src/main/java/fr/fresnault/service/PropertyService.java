package fr.fresnault.service;

import fr.fresnault.domain.Property;
import fr.fresnault.repository.PropertyRepository;
import fr.fresnault.repository.search.PropertySearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Property.
 */
@Service
public class PropertyService {

    private final Logger log = LoggerFactory.getLogger(PropertyService.class);

    private final PropertyRepository propertyRepository;

    private final PropertySearchRepository propertySearchRepository;

    public PropertyService(PropertyRepository propertyRepository, PropertySearchRepository propertySearchRepository) {
        this.propertyRepository = propertyRepository;
        this.propertySearchRepository = propertySearchRepository;
    }

    /**
     * Save a property.
     *
     * @param property the entity to save
     * @return the persisted entity
     */
    public Property save(Property property) {
        log.debug("Request to save Property : {}", property);
        Property result = propertyRepository.save(property);
        propertySearchRepository.save(result);
        return result;
    }

    /**
     * Get all the properties.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    public Page<Property> findAll(Pageable pageable) {
        log.debug("Request to get all Properties");
        return propertyRepository.findAll(pageable);
    }


    /**
     * Get one property by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    public Optional<Property> findOne(String id) {
        log.debug("Request to get Property : {}", id);
        return propertyRepository.findById(id);
    }

    /**
     * Delete the property by id.
     *
     * @param id the id of the entity
     */
    public void delete(String id) {
        log.debug("Request to delete Property : {}", id);
        propertyRepository.deleteById(id);
        propertySearchRepository.deleteById(id);
    }

    /**
     * Search for the property corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    public Page<Property> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Properties for query {}", query);
        return propertySearchRepository.search(queryStringQuery(query), pageable);    }
}
