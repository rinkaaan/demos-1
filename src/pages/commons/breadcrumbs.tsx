// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';

import BreadcrumbGroup, { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';

export function Breadcrumbs({
  items,
  rootText = 'Service',
  rootHref = '#',
}: {
  items: BreadcrumbGroupProps['items'];
  rootText?: string;
  rootHref?: string;
}) {
  if (items.length === 0) {
    return null;
  }
  return (
    <BreadcrumbGroup
      items={[{ text: rootText, href: rootHref }, ...items]}
      expandAriaLabel="Show path"
      ariaLabel="Breadcrumbs"
    />
  );
}
