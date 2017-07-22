'use babel';
/* eslint-env jasmine, atomtest */
import sinon from 'sinon';
import GlslLivecoder from '../lib/glsl-livecoder';

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

  describe('commands', () => {
    let stub;

    beforeEach(() => {
      atom.commands.dispatch(workspaceElement, 'glsl-livecoder:toggle');
      waitsForPromise(() => activationPromise);
    });

    afterEach(() => {
      stub.restore();
    });

    it('calls GlslLivecoder.prototype.loadShader', () => {
      stub = sinon.stub(GlslLivecoder.prototype, 'loadShader');
      atom.commands.dispatch(workspaceElement, 'glsl-livecoder:load-shader');
      expect(stub.calledOnce).toBe(true);
    });

    it('calls GlslLivecoder.prototype.watchShader', () => {
      stub = sinon.stub(GlslLivecoder.prototype, 'watchShader');
      atom.commands.dispatch(workspaceElement, 'glsl-livecoder:watch-shader');
      expect(stub.calledOnce).toBe(true);
    });

    it('calls GlslLivecoder.prototype.watchActiveShader', () => {
      stub = sinon.stub(GlslLivecoder.prototype, 'watchActiveShader');
      atom.commands.dispatch(workspaceElement, 'glsl-livecoder:watch-active-shader');
      expect(stub.calledOnce).toBe(true);
    });

    it('calls GlslLivecoder.prototype.stopWatching', () => {
      stub = sinon.stub(GlslLivecoder.prototype, 'stopWatching');
      atom.commands.dispatch(workspaceElement, 'glsl-livecoder:stop-watching');
      expect(stub.calledOnce).toBe(true);
    });
  });
});
