const customers = [{
    id: 1,
    nome: "Jhow",
    idade: 25,
    uf: "RJ"
}];

function selectCustomers() {
    return customers;
}

function selectCustomer(id) {
    return customers.find(c => c.id === id);
}

function insertCustomer(customer) {
    customers.push(customer);
}

function updateCustomer(id, updatedCustomer) {
    const customerToUpdate = customers.find(c => c.id === id);
    if (!customerToUpdate) return;

    // Atualize os campos do cliente com os novos dados
    customerToUpdate.nome = updatedCustomer.nome;
    customerToUpdate.idade = updatedCustomer.idade;
    customerToUpdate.uf = updatedCustomer.uf;
}
function deleteCustomer(id){
    const index = customers.findIndex( c => c.id === id);
    customers.splice(index, 1);
}

module.exports = {
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
};
