'use babel';
/* eslint-env jasmine, atomtest */

describe('GlslLivecoder', () => {
  let workspaceElement;
  let activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('glsl-livecoder');
  });

  describe('when the glsl-livecoder:toggle event is triggered', () => {
    it('hides and shows the view', () => {
      expect(workspaceElement.querySelector('.glsl-livecoder')).not.toExist();
      atom.commands.dispatch(workspaceElement, 'glsl-livecoder:toggle');

      waitsForPromise(() => activationPromise);

      runs(() => {
        expect(document.body.classList.contains('glsl-livecoder-enabled')).toBe(true);
        const element = workspaceElement.querySelector('.glsl-livecoder');
        const canvas = element.querySelector('canvas');
        expect(element).toExist();
        expect(canvas).toExist();
        expect(canvas.style.width).toEqual(window.innerWidth + 'px');
        expect(canvas.style.height).toEqual(window.innerHeight + 'px');

        atom.commands.dispatch(workspaceElement, 'glsl-livecoder:toggle');
        expect(document.body.classList.contains('glsl-livecoder-enabled')).toBe(false);
      });
    });
  });
});
