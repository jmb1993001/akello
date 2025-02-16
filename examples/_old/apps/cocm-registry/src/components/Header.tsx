import { AppShell, Button, UnstyledButton, Text, Burger } from '@mantine/core';

import Logo from '../assets/logo.png';
import ThemeToggle from './ThemeToggle';
import HeaderMenu from './Menu';
import { useNavigate } from 'react-router-dom';
import { useAkello } from "@akello/react-hook";
import { IconUserPlus, IconPlus } from '@tabler/icons-react';

interface HeaderProps {
  loggedIn: boolean;  
  opened: boolean;
  toggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ loggedIn, opened, toggle }) => {
  const navigate = useNavigate();
  const akello = useAkello();  


  if (loggedIn) {
    return (
      <AppShell.Header className='flex justify-between px-4'>   
        

        <div className='flex flex-row space-x-3'>
          <Burger
            className='my-auto'
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          >             
          </Burger>
          <UnstyledButton
            onClick={() => {
              akello.selectRegistry(undefined);
              navigate('/');
            }}
            className='flex h-8 w-auto my-auto'
          >
            <img src={Logo} alt='logo' className='h-8 w-auto' />
          </UnstyledButton>
          
          <div className='my-auto'>
            <Text fw={600} size={'xl'}>
              {akello.getSelectedRegistry()?.name ?? ''}            
            </Text>
          </div>          
        </div>
        
        <div className='flex flex-row my-auto space-x-6'>
          {akello.getSelectedRegistry() && (
            <Button
              variant="default"
              leftSection={<IconUserPlus size={14} />} 
              onClick={() => {
                const selectedRegistry = akello.getSelectedRegistry();
                if (selectedRegistry) {
                  navigate(`/registry/${selectedRegistry.id}/patient-referral`);
                }
              }}
            >
              Add Patient
            </Button>
          )}

          {!akello.getSelectedRegistry() && (
            <Button
              variant="default"
              leftSection={<IconPlus size={14} />} 
              onClick={() => {
                navigate('/create-registry');
              }}
            >
              Create Registry              
            </Button>
          )}

          <HeaderMenu />
        </div>
      </AppShell.Header>
    );
  }

  return (
    <AppShell.Header className='flex justify-between px-4 my-auto'>
      <UnstyledButton onClick={() => {}} className='flex h-10 w-auto my-auto'>
        <img src={Logo} alt='logo' className='h-10 w-auto' />
      </UnstyledButton>
      <div className='flex w-auto h-10 my-auto'>
        <ThemeToggle />
      </div>
    </AppShell.Header>
  );
};

export default Header;