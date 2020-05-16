#!/usr/bin/env python

import os

scriptsdir = os.path.dirname(os.path.realpath(__file__))
componentsdir = os.path.join(scriptsdir, "..", "src/components")
components = os.listdir(componentsdir)
outputdir = os.path.join(scriptsdir, "..", "public")
for c in components:
    component_dom = ""
    with open(os.path.join(componentsdir, c, c + ".html")) as template:
        component_dom = template.read()

    with open(os.path.join(componentsdir, c, c + ".css")) as styles:
        component_dom += f"<style>{styles.read()}</style>"

    component_js = ""
    with open(os.path.join(componentsdir, c, c + ".js")) as script:
        component_js = script.read()

    component = component_js.replace(
        'this.shadowRoot.innerHTML = "";',
        f"this.shadowRoot.innerHTML =  `{component_dom}`",
    )

    with open(os.path.join(outputdir, c + "-component.js"), "w") as outfile:
        outfile.write(component)
