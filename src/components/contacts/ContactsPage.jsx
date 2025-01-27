import React from "react";
import { connect } from "react-redux";
import {
  checkAll,
  deleteAll,
  deleteOneContact,
  updatePagination
} from "../../actions";
import Pagination from "../paginationTemplate/Pagination";

import { Button, Container, Row, Col } from "reactstrap";

//
import ContactsTable from "./ContactsTable";

class ContactsPage extends React.Component {
  //
  //
  onUpdate = id => {
    this.props.history.push(`/update/${id}`);
  };
  onDelete = id => this.props.deleteOneContact(id);

  // ////////////////////////////////
  onPageChanged = data => data;
  // ///////////////////////////////
  render() {
    const {
      history,
      contacts,
      flag,
      checkAll,
      deleteAll,
      pagination: { currentPage, contactsPerPage },
      updatePagination
    } = this.props;
    // Get current page
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(
      indexOfFirstContact,
      indexOfLastContact
    );
    // const ascendingCurrentContacts = currentContacts;
    // const descendingCurrentContacs = currentContacts;
    //
    return (
      <div>
        <Container style={{ padding: "5%" }}>
          <Row>
            <Col xs={{ order: 2, offset: 1 }} md={{ order: 1, offset: 0 }}>
              <Button
                color="danger"
                disabled={!flag}
                onClick={deleteAll}
                style={{ margin: "1rem", marginLeft: "0" }}
              >
                Delete Contacts
              </Button>
            </Col>
            <Col xs={{ order: 3 }} md={{ order: 2, offset: 2 }}>
              <Button
                color="info"
                onClick={() => {
                  // console.log(form);
                  history.push("/new");
                }}
                style={{ margin: "1rem", marginLeft: "0" }}
              >
                New Contact
              </Button>
            </Col>
            <Col
              xs={{ order: 1, offset: 1, size: 11 }}
              md={{ order: 3, size: "auto" }}
              style={{ margin: "1rem", marginLeft: "0" }}
            >
              {/* Pagination */}
              <Pagination
                contactsPerPage={contactsPerPage}
                totalContacts={contacts.length}
                updatePagination={updatePagination}
                currentPage={currentPage}
              />
              {/* Pagination */}
            </Col>
          </Row>

          <Row>
            <Col>
              <ContactsTable
                // contacts={contacts}
                contacts={currentContacts}
                flag={flag}
                checkAll={checkAll}
                onUpdate={this.onUpdate}
                onDelete={this.onDelete}
              />
            </Col>
          </Row>
        </Container>
        <div
          style={{
            fontWeight: "600",
            fontSize: "1.5rem",
            color: "#000",
            position: "fixed",
            top: "90%",
            left: "10%"
          }}
        >
          All Contacts: {contacts.length}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
  flag: state.flag,
  pagination: state.pagination
});

export default connect(
  mapStateToProps,
  { checkAll, deleteAll, deleteOneContact, updatePagination }
)(ContactsPage);
