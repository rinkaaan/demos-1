// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
export function adjustBodyPadding() {
  const header = document.querySelector('#h');
  if (!header) {
    // Header is optional - if not found, set padding to 0
    document.documentElement.style.scrollPaddingTop = '0px';
    return;
  }
  const { height: headerHeight } = header.getBoundingClientRect();
  document.documentElement.style.scrollPaddingTop = `${headerHeight}px`;
}

window.addEventListener('DOMContentLoaded', adjustBodyPadding);
window.addEventListener('resize', adjustBodyPadding);
