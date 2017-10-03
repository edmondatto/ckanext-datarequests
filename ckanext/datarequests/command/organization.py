import datetime
import sys

import ckan.logic as logic
import ckanext.datarequests.db as db
from ckan.lib.cli import CkanCommand
from ckan.model.user import User


class DefaultOrganization(CkanCommand):
    '''Creates a default datarequest organization all datarequests

     Usage:
        organization add NAME                 - create a default data request organization associated with
                                                all data requests
     '''
    summary = __doc__.split('\n')[0]
    usage = __doc__
    max_args = None
    min_args = 1

    def command(self):
        self._load_config()

        cmd = self.args[0]
        if cmd == 'set_default':
            self.set_default()

    def set_default(self):
        import ckan.model as model

        if len(self.args) < 2:
            print('Name of default organization is required!')
            sys.exit(1)
        default_organization_name = self.args[1]

        # parse args into the data_dict
        data_dict = {'name': default_organization_name}
        site_user = logic.get_action('get_site_user')({'model': model, 'ignore_auth': True}, {})
        context = {
            'model': model,
            'session': model.Session,
            'ignore_auth': True,
            'user': site_user['name'],
        }

        print 'Setting as default, Organization: {}...\n'.format(default_organization_name)
        print '\nUse the credentials below to login as the default user and manage the default organization'
        print 'Username: {}'.format(site_user['name'])
        print 'Password: {}\n'.format(site_user['apikey'])
        print '\nNote: If you have already changed this password, disregard the one above and use that instead.\n'

        try:
            organization_exists = logic.get_action('organization_show')(context, {'id': default_organization_name})
            db.init_db(model)
            default_org = db.DefaultOrganization()
            default_org.organization_id = organization_exists['id']
            default_org.organization_name = organization_exists['name']
            default_org.open_time = datetime.datetime.now()
            db.DefaultOrganization.delete_all()
            model.Session.add(default_org)
            model.Session.commit()

        except logic.NotFound:
            try:
                site_user = logic.get_action('get_site_user')({'model': model, 'ignore_auth': True}, {})
                context = {
                    'model': model,
                    'session': model.Session,
                    'ignore_auth': True,
                    'user': site_user['name'],
                }

                default_organization_dict = logic.get_action('organization_create')(context, data_dict)
                db.init_db(model)
                default_org = db.DefaultOrganization()
                default_org.organization_id = default_organization_dict['id']
                default_org.organization_name = default_organization_dict['name']
                default_org.open_time = datetime.datetime.now()
                db.DefaultOrganization.delete_all()
                model.Session.add(default_org)
                model.Session.commit()

                print '\nAn organization called {} has been created successfully.'.format(default_organization_name)

            except logic.ValidationError, e:
                print(e)
