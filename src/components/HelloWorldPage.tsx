import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  K8sResourceCommon,
  ListPageHeader,
  useK8sWatchResource,
} from '@openshift-console/dynamic-plugin-sdk';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  List,
  ListItem,
  PageSection,
  Spinner,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import CommunityDisclaimer from './CommunityDisclaimer';
import './HelloWorldPage.css';

const I18N = 'plugin__oct-hello-world';
const PLUGIN_VERSION = '1.0.0';

type ClusterVersionKind = K8sResourceCommon & {
  status?: {
    desired?: {
      version?: string;
    };
  };
};

const HelloWorldPage: FC = () => {
  const { t } = useTranslation(I18N);

  const [cv, cvLoaded, cvError] = useK8sWatchResource<ClusterVersionKind>({
    groupVersionKind: {
      group: 'config.openshift.io',
      version: 'v1',
      kind: 'ClusterVersion',
    },
    name: 'version',
    namespaced: false,
  });

  const ocpVersion = cvLoaded && !cvError ? cv?.status?.desired?.version : undefined;

  const goManagementHub = () => {
    window.location.href = '/community-tools/management';
  };

  return (
    <>
      <PageSection type="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem
            component="a"
            onClick={(e) => {
              e.preventDefault();
              goManagementHub();
            }}
          >
            {t('Management')}
          </BreadcrumbItem>
          <BreadcrumbItem isActive>{t('Hello World')}</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <ListPageHeader title={t('Hello World!')} />
      <PageSection>
        <Stack hasGutter>
          <StackItem>
            <CommunityDisclaimer />
          </StackItem>

          <StackItem>
            <Card className="hw-card">
              <CardTitle>{t('About this template')}</CardTitle>
              <CardBody>
                <p>
                  {t('This is a template for building OCT extensions. Fork this repo to create your own.')}
                </p>
              </CardBody>
            </Card>
          </StackItem>

          <StackItem>
            <Card className="hw-card">
              <CardTitle>{t('Resources')}</CardTitle>
              <CardBody>
                <List>
                  <ListItem>
                    <Button
                      variant="link"
                      isInline
                      component="a"
                      href="https://github.com/openshift-community-tools/oct-hello-world"
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={<ExternalLinkAltIcon />}
                      iconPosition="end"
                    >
                      {t('GitHub repository')}
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      variant="link"
                      isInline
                      component="a"
                      href="https://octools.net/guide"
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={<ExternalLinkAltIcon />}
                      iconPosition="end"
                    >
                      {t('Developer guide')}
                    </Button>
                  </ListItem>
                </List>
              </CardBody>
            </Card>
          </StackItem>

          <StackItem>
            <Card className="hw-card">
              <CardTitle>{t('Version info')}</CardTitle>
              <CardBody>
                <List>
                  <ListItem>
                    {t('Plugin version: {{version}}', { version: PLUGIN_VERSION })}
                  </ListItem>
                  <ListItem>
                    {!cvLoaded && !cvError ? (
                      <Spinner size="sm" aria-label={t('Loading cluster version')} />
                    ) : cvError ? (
                      t('OpenShift version: unavailable')
                    ) : (
                      t('OpenShift version: {{version}}', { version: ocpVersion || t('unknown') })
                    )}
                  </ListItem>
                </List>
              </CardBody>
            </Card>
          </StackItem>
        </Stack>
      </PageSection>
    </>
  );
};

export default HelloWorldPage;
