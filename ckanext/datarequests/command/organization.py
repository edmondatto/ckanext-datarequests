import sys
from ckan.lib.cli import CkanCommand


class DefaultOrganization(CkanCommand):
    '''Creates a default datarequest organization all datarequests

     Usage:
        organization add NAME                                          - create a default data request organization associated with
                                                                       all data requests
     '''
    summary = __doc__.split('\n')[0]
    usage = __doc__
    max_args = None
    min_args = 1

    def command(self):
        self._load_config()

        cmd = self.args[0]
        if cmd == 'add':
            self.add()

    def add(self):
        import ckan.model as model

        if len(self.args) < 2:
            print 'Name of default organization is required!'
            sys.exit(1)
        default_organization_name = self.args[1]

        # parse args into the data_dict
        data_dict = {'name': default_organization_name}

        print 'Creating organization: {}...'.format(default_organization_name)

        try:
            import ckan.logic as logic
            site_user = logic.get_action('get_site_user')({'model': model, 'ignore_auth': True}, {})
            context = {
                'model': model,
                'session': model.session,
                'ignore_auth': True,
                'user': site_user['name'],
            }

            default_organization_dict =  logic.get_action('organization_create')(context, data_dict)
            print(default_organization_dict)

        except logic.ValidationError, e:
            print e