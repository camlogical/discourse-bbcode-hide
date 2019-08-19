# frozen_string_literal: true

require 'rails_helper'

describe PrettyText do
  it 'can apply hide bbcode' do
    cooked = PrettyText.cook "hello [hide=guest]Hide content[/hide] world"
    html = '<p>hello <div class="hideto guest">Hide Content</div> world</p>'

    expect(cooked).to eq(html)
  end
end
