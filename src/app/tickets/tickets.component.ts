import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../services/tickets.services';
import { AuthService } from '../services/auth.services';
import { Router } from '@angular/router';
import { CredentialsService } from '../services/credentials.service';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { faTrash, faEdit, faSignOut } from '@fortawesome/free-solid-svg-icons';

declare var window: any;

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  faTrash = faTrash;
  faFileEdit = faEdit;
  faSignOut = faSignOut;
  formModal: any;
  tickets: any = [];
  users: any = [];
  show = false;
  form: FormGroup;
  typeTickets = ['OPEN', 'PROCESS', 'CLOSE'];
  loader = false;
  messageAlert = null;
  typeAlert = null;
  filterStatus = null;
  ticketId = null;
  openDeleteModal = false;

  constructor(
    private ticketsService: TicketsService,
    private credentialsService: CredentialsService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    this.getTickes();
    this.getUser();
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null],
      status: ['OPEN', [Validators.required]],
      user_id: [null, [Validators.required]],
    });
  }

  resetForm() {
    this.form.reset({ status: 'OPEN' });
  }

  openFormModal(id = null, deleteModal = false) {
    this.ticketId = id;
    if (!id) {
      this.resetForm();
    }
    this.openDeleteModal = deleteModal;
    this.formModal.show();
  }

  closeFormModal() {
    this.formModal.hide();
  }

  async getUser() {
    try {
      this.show = false;
      this.users = await this.authService.getUsers();
    } catch (error) {
      this.showAlert('danger', 'Lo sentimos tuvimos un problema');
    }
  }

  async getTickes(params = null) {
    try {
      this.tickets = [];
      this.loader = true;
      this.tickets = await this.ticketsService.getTickets(params);
      this.tickets.forEach(ticket => {
        let color = null;
        switch (ticket.status) {
          case 'OPEN':
            color = 'bg-warning text-dark';
            break;
          case 'PROCESS':
            color = 'bg-primary';
            break;
          case 'CLOSE':
            color = 'bg-success';
            break;
          default:
            color = 'bg-warning text-dark';
            break;
        }
        ticket.color = color;
      });
      this.loader = false;
    } catch (error) {
      this.loader = false;
      this.showAlert('danger', 'Lo sentimos tuvimos un problema');
    }
  }

  async saveTicket() {
    try {
      this.loader = true;
      this.tickets = await this.ticketsService.saveTickets(this.form.value);
      this.reloadData();
      this.showAlert('success', 'Se ha creado el ticket exitosamente');
    } catch (error) {
      this.loader = false;
      this.showAlert('danger', 'Lo sentimos tuvimos un problema');
    }
  }

  async updateTicket() {
    try {
      const data = this.form.value;
      data.id = this.ticketId;

      this.loader = true;
      this.tickets = await this.ticketsService.updateTickets(data);
      this.reloadData();
      this.showAlert('success', 'Se ha actualizado el ticket exitosamente');
    } catch (error) {
      this.loader = false;
      this.showAlert('danger', 'Lo sentimos tuvimos un problema');
    }
  }

  async deleteTicket() {
    try {
      this.loader = true;
      this.tickets = await this.ticketsService.deleteTickets(this.ticketId);
      this.reloadData();
      this.showAlert('success', 'Se ha eliminado el ticket exitosamente');
    } catch (error) {
      this.loader = false;
      this.showAlert('danger', 'Lo sentimos tuvimos un problema');
    }
  }

  reloadData() {
    this.getTickes();
    this.closeFormModal();
    this.resetForm();
  }

  filter() {
    if (this.filterStatus !== 'null') {
      this.getTickes(this.filterStatus)
    } else {
      this.getTickes();
    }
  }

  selectTicket(ticket, deleteModal = false) {
    this.openFormModal(ticket.id, deleteModal);
    this.form.get('title').setValue(ticket.title);
    this.form.get('description').setValue(ticket.description);
    this.form.get('status').setValue(ticket.status);
    this.form.get('user_id').setValue(ticket.user_id);
  }

  showAlert(type, message) {
    this.show = true;
    this.messageAlert = message;
    this.typeAlert = type;
    setTimeout(() => {
      this.show = false;
    }, 4000);
  }

  logout() {
    this.credentialsService.setCredentials();
    this.router.navigate(['/login']);
  }
}
