import React from 'react';
import { Form } from 'react-bootstrap';

const ServiceSelection = ({ services, selectedServices, handleServiceChange }) => {
    return (
        <div className="service-selection">
            <h6>Chọn dịch vụ:</h6>
            {services.map(service => (
                <Form.Check 
                    key={service.id}
                    type="checkbox"
                    label={`${service.name} (+${service.price.toLocaleString()} đ)`}
                    checked={selectedServices.includes(service.id)}
                    onChange={() => handleServiceChange(service.id)}
                />
            ))}
        </div>
    );
};

export default ServiceSelection;
