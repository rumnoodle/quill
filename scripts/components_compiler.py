#!/usr/bin/env python

import os


def traverse_web_components():
    currentdir = os.path.join(componentsdir, "/".join(recursedpath))
    for c in os.listdir(currentdir):
        try:
            component_dom = ""
            with open(os.path.join(currentdir, c, c + ".html")) as template:
                component_dom = template.read()

            with open(os.path.join(currentdir, c, c + ".css")) as styles:
                component_dom += f"<style>{styles.read()}</style>"

            component_js = ""
            with open(os.path.join(currentdir, c, c + ".js")) as script:
                component_js = script.read()

            component = component_js.replace(
                'this.shadowRoot.innerHTML = "";',
                f"this.shadowRoot.innerHTML =  `{component_dom}`",
            )

            with open(
                os.path.join(outputdir, "/".join(recursedpath), c + "-component.js"),
                "w",
            ) as outfile:
                outfile.write(component)

        except:
            if os.path.isdir(os.path.join(componentsdir, c)):
                recursedpath.append(c)

                if not os.path.isdir(os.path.join(outputdir, "/".join(recursedpath))):
                    os.mkdir(os.path.join(outputdir, "/".join(recursedpath)))

                traverse_web_components()

    if recursedpath:
        recursedpath.pop()


scriptsdir = os.path.dirname(os.path.realpath(__file__))
componentsdir = os.path.join(scriptsdir, "..", "src/components")
outputdir = os.path.join(scriptsdir, "..", "src/compiled")
recursedpath = []
traverse_web_components()
