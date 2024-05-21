import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { createRequest } from './commons.service';
import { CustomerResponse, CustomerModel } from '../models/customer.model';

export function getCustomerById(id: string): Observable<CustomerResponse> {
    const config = {
        method: 'get',
        url: `${environment.apiBookStore}/Customer/GetCustomerById/${id}`
    }

    return createRequest<CustomerResponse>(config);
}

export function getCustomer(name : string, documentNumber: string): Observable<CustomerResponse[]> {
    const config = {
        method: 'get',
        url: `${environment.apiBookStore}/Customer/CustomerList?name=${name}&documentNumber${documentNumber}`
    }

    return createRequest<CustomerResponse[]>(config);
}


export function postCustomer(request: CustomerModel): Observable<CustomerResponse> {
    const config = {
        method: 'post',
        url: `${environment.apiBookStore}/Customer`,
        data: request
    }

    return createRequest<CustomerResponse>(config);
}

export function putCustomer(request: CustomerModel): Observable<CustomerResponse> {
    const config = {
        method: 'put',
        url: `${environment.apiBookStore}/Customer`,
        data: request
    }

    return createRequest<CustomerResponse>(config);
}
