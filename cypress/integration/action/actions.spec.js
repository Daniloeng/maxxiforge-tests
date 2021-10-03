/// <reference types="cypress"/>
/*jshint esversion: 6 */

describe("Should test actions in action", () => {

    let token

    before(() => {
        cy.getToken('admin@mailinator.com', '123456@aA')
            .then(tkn => {
                token = tkn;
            });
    })
    it('Should create an new action', () => {
        cy.request({
            url: 'https://dev-api-maxxiforge.appsmaxxidata.com/api/v1/actions?lng=pt-BR',
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                actionPlannedDoneTime: "2021-09-30T12:00:00Z",
                actionStatus: "PLANEJADA",
                actionSubject: "test api cypress",
                actionTypeId: 3,
                customerId: 17,
                finish: false,
                locationId: null,
                memberId: 7,
                plannedEndTime: "2021-09-30T13:00:00Z",
                plannedStartTime: "2021-09-30T12:00:00Z"
            }
        }).as('response');

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201),
                expect(res.body).to.have.property('id'),
                expect(res.body).to.have.property('actionSubject', 'test api cypress');
        });
    });

    it('Should create an new action through commands', () => {
        cy.request({
            url: 'https://dev-api-maxxiforge.appsmaxxidata.com/api/v1/actions?lng=pt-BR',
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                actionPlannedDoneTime: "2021-09-30T12:00:00Z",
                actionStatus: "PLANEJADA",
                actionSubject: "test api cypress10",
                actionTypeId: 3,
                customerId: 17,
                finish: false,
                locationId: null,
                memberId: 7,
                plannedEndTime: "2021-09-30T13:00:00Z",
                plannedStartTime: "2021-09-30T12:00:00Z"
            }
        }).as('response');

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201),
                expect(res.body).to.have.property('id'),
                expect(res.body).to.have.property('actionSubject', 'test api cypress10');
        });
    });

    it('Should update an action', () => {
        cy.request({
            url: 'https://dev-api-maxxiforge.appsmaxxidata.com/api/v1/actions/55?lng=pt-BR',
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
            body: {
                actionPlannedDoneTime: "2021-09-30T12:00:00Z",
                actionStatus: "NAO_PLANEJADA",
                actionSubject: "test api cypress alterada",
                actionTypeId: 3,
                customerId: 17,
                finish: false,
                locationId: null,
                memberId: 7,
                plannedEndTime: "2021-09-30T13:00:00Z",
                plannedStartTime: "2021-09-30T12:00:00Z"
            }
        }).as('response');

        cy.get('@response').its('status').should('be.equal', 200);
    });

});