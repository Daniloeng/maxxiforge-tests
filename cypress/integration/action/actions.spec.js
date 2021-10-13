/// <reference types="cypress"/>



describe("Should test actions in action", () => {

    let token
    before(() => {
        cy.getToken('admin@mailinator.com', '123456@aA')
            .then(tkn => {
                token = tkn;
            });
    })
    
    it('Should create an new action PLANEJADA', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/actions?lng=pt-BR',
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                actionPlannedDoneTime: "2021-10-15T12:00:00Z",
                actionStatus: "PLANEJADA",
                actionSubject: "Evento como PLANEJADA",
                actionTypeId: 3,
                customerId: 17,
                finish: false,
                locationId: null,
                memberId: 7,
                plannedEndTime: "2021-10-15T13:00:00Z",
                plannedStartTime: "2021-10-15T12:00:00Z"
            }
        }).as('response');

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201),
                expect(res.body).to.have.property('id'),
                expect(res.body).to.have.property('actionSubject', 'Evento como PLANEJADA');
        });
    });

    it('Should create an new action, NAO_PLANEJADA', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/actions?lng=pt-BR',
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                actionPlannedDoneTime: "2021-10-10T12:00:00Z",
                actionStatus: "NAO_PLANEJADA",
                actionSubject: "Evento como PLANEJADA",
                actionTypeId: 3,
                customerId: 17,
                finish: false,
                locationId: null,
                memberId: 7,
                plannedEndTime: "2021-10-10T13:00:00Z",
                plannedStartTime: "2021-10-10T12:00:00Z"
            }
        }).as('response');

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201),
                expect(res.body).to.have.property('id'),
                expect(res.body).to.have.property('actionSubject', 'Evento como PLANEJADA');
        });
    });

    it('Should create an new action REALIZADA', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/actions?lng=pt-BR',
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                actionPlannedDoneTime: "2021-10-10T12:00:00Z",
                actionStatus: "REALIZADA",
                actionSubject: "Evento como REALIZADA",
                actionTypeId: 3,
                customerId: 17,
                finish: false,
                locationId: null,
                memberId: 7,
                plannedEndTime: "2021-10-10T12:00:00Z",
                plannedStartTime: "2021-10-10T12:00:00Z"
            }
        }).as('response');

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201),
                expect(res.body).to.have.property('id'),
                expect(res.body).to.have.property('actionSubject', 'Evento como REALIZADA');
        });
    });

    it('Should update an action', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/actions/42?lng=pt-BR',
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                actionPlannedDoneTime: "2021-10-14T12:00:00Z",
                actionStatus: "NAO_PLANEJADA",
                actionSubject: "test api cypress alterada",
                actionTypeId: 3,
                customerId: 17,
                finish: false,
                locationId: null,
                memberId: 7,
                plannedEndTime: "2021-10-14T13:00:00Z",
                plannedStartTime: "2021-10-14T12:00:00Z"
            }
        }).as('response');

        cy.get('@response').its('status').should('be.equal', 200);
    });

});